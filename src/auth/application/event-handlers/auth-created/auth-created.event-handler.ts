import { Logger } from '@nestjs/common';
import { AuthCreatedEvent } from 'src/auth/domain/events/auth-created/auth-created.event';

export class AuthCreatedEventHandler {
  private readonly logger = new Logger(AuthCreatedEventHandler.name);
  /**
   * Handles the AuthCreatedEvent.
   * @param event The AuthCreatedEvent instance
   */
  handle(event: AuthCreatedEvent): void {
    this.logger.log(`AuthCreatedEvent received: ${JSON.stringify(event)}`);
    // TODO: Implement logic, e.g., publish UserRegisteredIntegrationEvent
  }
}
