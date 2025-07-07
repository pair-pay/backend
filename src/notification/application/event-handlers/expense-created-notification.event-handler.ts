import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ExpenseCreatedIntegrationEvent } from 'src/expenses/application/events/expense-created.integration-event';
import { NotificationFactory } from 'src/notification/domain/factories/notification.factory';
import { NotificationService } from '../notification.service';
import { EVENTS_CONSTANTS } from 'src/common/constants/events/events.constants';

/**
 * Event handler for ExpenseCreatedEvent to trigger notifications.
 */
@EventsHandler(ExpenseCreatedIntegrationEvent)
export class ExpenseCreatedNotificationEventHandler
  implements IEventHandler<ExpenseCreatedIntegrationEvent>
{
  private readonly logger = new Logger(
    ExpenseCreatedNotificationEventHandler.name,
  );

  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationFactory: NotificationFactory,
  ) {}

  async handle(event: ExpenseCreatedIntegrationEvent): Promise<void> {
    this.logger.debug(`Notifying expense created event: ${event.id}`);

    const notification = this.notificationFactory.create(
      EVENTS_CONSTANTS.EXPENSE_CREATED,
      event.name,
      {
        id: event.id,
        name: event.name,
        amount: event.amount,
        currency: event.currency,
        description: event.description,
        date: event.date,
        userId: event.userId,
        groupId: event.groupId,
        createdAt: event.createdAt,
      },
    );

    await this.notificationService.notify(notification);
  }
}
