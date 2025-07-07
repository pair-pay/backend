import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from './reset-password.command';
import { AuthRepository } from '../../ports/auth.repository';
import { Logger } from '@nestjs/common';
import { AuthResetPasswordTokenValueObject } from 'src/auth/domain/value-objects/auth-reset-password-token/auth-reset-password-token.value-object';
import { AuthPasswordValueObject } from 'src/auth/domain/value-objects/auth-password/auth-password.value-object';
import { PasswordResetCompletedIntegrationEvent } from '../../events/password-reset-completed/password-reset-completed.integration-event';
import { InvalidResetPasswordTokenException } from 'src/auth/domain/exceptions/invalid-reset-password-token.exception';

/**
 * Handler for the ResetPasswordCommand.
 * Validates the reset token, updates the password, and publishes an event.
 */
@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  private readonly logger = new Logger(ResetPasswordCommandHandler.name);

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const { email, token, newPassword } = command;

    // 1. Find the user/auth by email
    const auth = await this.authRepository.findByEmail(email);
    if (!auth || !auth.resetPasswordToken) {
      this.logger.warn(
        `Reset password attempt for non-existent or invalid user: ${email}`,
      );
      throw new InvalidResetPasswordTokenException(
        'Invalid or expired reset token',
      );
    }

    // 2. Validate the token and expiration
    const resetTokenVO =
      auth.resetPasswordToken as AuthResetPasswordTokenValueObject;
    if (resetTokenVO.value !== token || resetTokenVO.isExpired()) {
      this.logger.warn(`Invalid or expired reset token for email: ${email}`);
      throw new InvalidResetPasswordTokenException(
        'Invalid or expired reset token',
      );
    }

    // 3. Update the password and clear the reset token
    const updatedAuth = auth.updatePassword(
      await AuthPasswordValueObject.fromPlain(newPassword),
    );
    await this.authRepository.update(updatedAuth);

    // 4. Publish the integration event
    this.eventBus.publish(
      new PasswordResetCompletedIntegrationEvent(
        auth.id,
        auth.userId,
        auth.email.value,
        new Date(),
      ),
    );

    this.logger.log(`Password reset completed for ${email}`);
  }
}
