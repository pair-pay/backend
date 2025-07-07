import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserCreatedIntegrationEvent } from 'src/user/application/events/user-created.integration-event';
import { NotificationService } from '../notification.service';
import { Notification } from '../../domain/notification';
import { ActionValueObject } from '../../domain/value-objects/action.value-object';
import { MessageValueObject } from '../../domain/value-objects/message.value-object';
import { randomUUID } from 'node:crypto';
import { NotificationFactory } from 'src/notification/domain/factories/notification.factory';
import { EVENTS_CONSTANTS } from 'src/common/constants/events/events.constants';

/**
 * Event handler for UserCreatedIntegrationEvent to trigger notifications.
 */
@EventsHandler(UserCreatedIntegrationEvent)
export class UserCreatedNotificationEventHandler
  implements IEventHandler<UserCreatedIntegrationEvent>
{
  private readonly logger = new Logger(
    UserCreatedNotificationEventHandler.name,
  );

  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationFactory: NotificationFactory,
  ) {}

  async handle(event: UserCreatedIntegrationEvent): Promise<void> {
    this.logger.debug(`Notifying user created event: ${event.id}`);

    const notification = this.notificationFactory.create(
      EVENTS_CONSTANTS.USER_CREATED,
      event.name,
      {
        id: event.id,
        name: event.name,
        createdAt: event.createdAt,
      },
    );

    await this.notificationService.notify(notification);
  }
}
