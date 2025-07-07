import { NotificationProvider } from './ports/notification-provider.interface';
import { Notification } from '../domain/notification';
import { Logger } from '@nestjs/common';

/**
 * NotificationService handles sending notifications through all configured providers.
 */
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly providers: NotificationProvider[] = []) {}

  /**
   * Sends a notification to all configured providers.
   * @param notification The domain notification to send.
   */
  async notify(notification: Notification): Promise<void> {
    this.logger.debug(
      `Sending notification to ${this.providers.length} providers`,
    );

    const payload = notification.toPrimitives();
    const safeProviders = this.providers ?? [];
    if (safeProviders.length === 0) {
      return;
    }
    await Promise.all(safeProviders.map((provider) => provider.send(payload)));
  }
}
