import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RegisterUserByEmailCommand } from './register-user-by-email.command';
import { Logger, Inject } from '@nestjs/common';
import { AuthFactory } from 'src/auth/domain/factories/auth.factory';
import { AuthRepository } from '../../ports/auth.repository';
import { AuthCreatedEvent } from 'src/auth/domain/events/auth-created/auth-created.event';
import { CreateUserCommand } from 'src/user/application/commands/create-user.command';
import { AuthAlreadyExistsException } from 'src/auth/domain/exceptions/auth-already-exists.exception';
import { UserRegisteredIntegrationEvent } from '../../events/user-registered/user-registered.integration-event';
import { JwtService } from 'src/auth/application/ports/jwt.service';
import { AuthAccessTokenValueObject } from 'src/auth/domain/value-objects/auth-access-token/auth-access-token.value-object';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { User } from 'src/user/domain/entities/user.entity';
import { ResponseAuthDto } from '../../dtos/response-auth.dto';

@CommandHandler(RegisterUserByEmailCommand)
export class RegisterUserByEmailCommandHandler
  implements ICommandHandler<RegisterUserByEmailCommand>
{
  private readonly logger = new Logger(RegisterUserByEmailCommandHandler.name);

  constructor(
    private readonly authFactory: AuthFactory,
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async execute(command: RegisterUserByEmailCommand): Promise<ResponseAuthDto> {
    this.logger.debug(`Registering user by email: ${command.data.email}`);

    const { email, password } = command.data;

    // 1. Check if the auth already exists
    const authExists = await this.authRepository.findByEmail(email);
    if (authExists) {
      this.logger.error(`Auth already exists for email: ${email}`);
      throw new AuthAlreadyExistsException(
        `Auth already exists for email: ${email}`,
      );
    }

    // 2. Create the user
    const userCreated = await this.commandBus.execute(
      new CreateUserCommand({
        name: email,
      }),
    );

    if (!userCreated) {
      this.logger.error(`User not created for email: ${email}`);
      throw new Error(`User not created for email: ${email}`);
    }

    this.logger.log(`User created: ${JSON.stringify(userCreated)}`);

    // 3. Create the auth
    const auth = await this.authFactory.create({
      email,
      password,
      userId: userCreated.id,
    });

    // 4. Generate and assign the access token
    const generatedAccessToken =
      await this.authTokenService.generateAccessToken(auth);
    auth.accessToken = generatedAccessToken;

    // 5. Create the auth in the repository
    await this.authRepository.create(auth);

    // 6. Publish the auth created event
    this.eventBus.publish(new AuthCreatedEvent(auth));
    this.eventBus.publish(
      new UserRegisteredIntegrationEvent(
        auth.id,
        userCreated.id,
        auth.email.value,
        auth.createdAt,
        auth.firstLogin,
      ),
    );

    this.logger.log(`Auth created: ${JSON.stringify(auth)}`);

    return new ResponseAuthDto(
      auth.id,
      auth.userId,
      auth.email.value,
      auth.accessToken.value,
      auth.refreshToken.value,
      auth.isActive,
      auth.role.value,
      auth.firstLogin.toISOString(),
      auth.lastLogin.toISOString(),
      auth.createdAt.toISOString(),
      auth.updatedAt.toISOString(),
      userCreated,
      auth.accessToken.expiresIn,
    );
  }
}
