import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotificationFactory } from 'src/notification/domain/factories/notification.factory';
import { NotificationService } from '../notification.service';
import { EVENTS_CONSTANTS } from 'src/common/constants/events/events.constants';
import { GroupCreatedIntegrationEvent } from 'src/groups/application/events/group-created.integration-event';

/**
 * Event handler for ExpenseCreatedEvent to trigger notifications.
 */
@EventsHandler(GroupCreatedIntegrationEvent)
export class GroupCreatedNotificationEventHandler
  implements IEventHandler<GroupCreatedIntegrationEvent>
{
  private readonly logger = new Logger(
    GroupCreatedNotificationEventHandler.name,
  );

  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationFactory: NotificationFactory,
  ) {}

  async handle(event: GroupCreatedIntegrationEvent): Promise<void> {
    this.logger.debug(`Notifying group created event: ${event.id}`);

    const notification = this.notificationFactory.create(
      EVENTS_CONSTANTS.GROUP_CREATED,
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
