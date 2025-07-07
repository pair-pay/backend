import { NotificationPrimitive } from '../../domain/primitives/notification.primitive';

/**
 * NotificationProvider defines the contract for all notification providers.
 */
export interface NotificationProvider {
  /**
   * Sends a notification payload.
   * @param payload The notification payload to send.
   */
  send(payload: NotificationPrimitive): Promise<void>;
}
