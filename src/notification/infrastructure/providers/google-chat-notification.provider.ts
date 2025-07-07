import { Logger } from '@nestjs/common';
import { NotificationProvider } from '../../application/ports/notification-provider.interface';
import { NotificationPrimitive } from '../../domain/primitives/notification.primitive';

/**
 * GoogleChatNotificationProvider implements NotificationProvider for Google Chat channel.
 */
export class GoogleChatNotificationProvider implements NotificationProvider {
  private readonly logger = new Logger(GoogleChatNotificationProvider.name);

  async send(payload: NotificationPrimitive): Promise<void> {
    this.logger.debug('[Google Chat] Notification sent:', payload);
  }
}
