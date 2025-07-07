import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RequestPasswordResetCommand } from './request-password-reset.command';
import { AuthRepository } from '../../ports/auth.repository';
import { Logger } from '@nestjs/common';
import { AuthResetPasswordTokenValueObject } from 'src/auth/domain/value-objects/auth-reset-password-token/auth-reset-password-token.value-object';
import { PasswordResetRequestedIntegrationEvent } from '../../events/password-reset-requested/password-reset-requested.integration-event';
import { TokenGeneratorService } from 'src/auth/infrastructure/services/token-generator.service';

@CommandHandler(RequestPasswordResetCommand)
export class RequestPasswordResetCommandHandler
  implements ICommandHandler<RequestPasswordResetCommand>
{
  private readonly logger = new Logger(RequestPasswordResetCommandHandler.name);

  constructor(
    private readonly tokenGeneratorService: TokenGeneratorService,
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RequestPasswordResetCommand): Promise<void> {
    const email = command.email;

    // 1. Search the user/auth by email
    const auth = await this.authRepository.findByEmail(email);
    if (!auth) {
      // For security, do not reveal if the email exists or not
      this.logger.warn(
        `Password reset requested for non-existent email: ${email}`,
      );
      return;
    }

    // 2. Generate the token and expiration
    const token = this.tokenGeneratorService.generate();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // 3. Assign the token to the entity and save
    auth.resetPasswordToken = new AuthResetPasswordTokenValueObject(
      token,
      expiresAt,
    );
    await this.authRepository.update(auth);

    // 4. Publish the integration event
    this.eventBus.publish(
      new PasswordResetRequestedIntegrationEvent(
        auth.id,
        auth.userId,
        auth.email.value,
        new Date(),
      ),
    );

    this.logger.log(`Password reset token generated for ${email}`);
  }
}
