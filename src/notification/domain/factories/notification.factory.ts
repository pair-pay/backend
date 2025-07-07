import { randomUUID } from 'crypto';
import { Notification } from '../notification';
import { ActionValueObject } from '../value-objects/action.value-object';
import { MessageValueObject } from '../value-objects/message.value-object';

export class NotificationFactory {
  create(action: string, message: string, data: Record<string, any>) {
    return new Notification(
      randomUUID(),
      new ActionValueObject(action),
      new MessageValueObject(message),
      new Date(),
      data,
    );
  }
}
