import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { LoginUserByEmailCommand } from './login-user-by-email.command';
import { AuthRepository } from '../../ports/auth.repository';
import { Logger, UnauthorizedException, Inject } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { User } from 'src/user/domain/entities/user.entity';
import { JwtService } from 'src/auth/application/ports/jwt.service';
import { AuthAccessTokenValueObject } from 'src/auth/domain/value-objects/auth-access-token/auth-access-token.value-object';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { ResponseAuthDto } from '../../dtos/response-auth.dto';

@CommandHandler(LoginUserByEmailCommand)
export class LoginUserByEmailCommandHandler
  implements ICommandHandler<LoginUserByEmailCommand>
{
  private readonly logger = new Logger(LoginUserByEmailCommandHandler.name);

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly queryBus: QueryBus,
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async execute(command: LoginUserByEmailCommand): Promise<ResponseAuthDto> {
    this.logger.log(
      `Executing command to login user by email: ${command.data.email}`,
    );
    const { email, password } = command.data;

    this.logger.log(`Email: ${email}`);
    this.logger.log(`Password: ${password}`);

    const auth = await this.authRepository.findByEmail(email);
    const isPasswordValid = await auth.validatePassword(password);

    this.logger.log(`Auth repository: ${JSON.stringify(auth)}`);

    this.logger.log(
      `Is password valid: ${isPasswordValid} for email: ${email}`,
    );

    if (!auth || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.queryBus.execute(new GetUserByIdQuery(auth.userId));

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate the access token and assign it to the Auth entity
    const generatedAccessToken =
      await this.authTokenService.generateAccessToken(auth);
    auth.accessToken = generatedAccessToken;

    this.logger.log('User logged in', user);

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
      user,
      auth.accessToken.expiresIn,
    );
  }
}
