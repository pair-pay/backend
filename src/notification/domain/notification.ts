import { NotificationPrimitive } from './primitives/notification.primitive';
import { ActionValueObject } from './value-objects/action.value-object';
import { MessageValueObject } from './value-objects/message.value-object';

export class Notification {
  constructor(
    public readonly id: string,
    public readonly action: ActionValueObject,
    public readonly message: MessageValueObject,
    public readonly timestamp: Date,
    public readonly data: Record<string, any>,
  ) {}

  static fromPrimitives(primitive: NotificationPrimitive): Notification {
    return new Notification(
      primitive.id,
      new ActionValueObject(primitive.action),
      new MessageValueObject(primitive.message),
      primitive.timestamp,
      primitive.data,
    );
  }

  toPrimitives(): NotificationPrimitive {
    return {
      id: this.id,
      action: this.action.value,
      message: this.message.value,
      timestamp: this.timestamp,
      data: this.data,
    };
  }
}
