import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ExpenseCreatedEvent } from '../../domain/events/expense-created.event';
import { ExpenseCreatedIntegrationEvent } from '../events/expense-created.integration-event';

/**
 * Event handler responsible for handling user creation events
 */
@EventsHandler(ExpenseCreatedEvent)
export class ExpenseCreatedEventHandler
  implements IEventHandler<ExpenseCreatedEvent>
{
  private readonly logger = new Logger(ExpenseCreatedEventHandler.name);

  constructor(private readonly eventBus: EventBus) {}

  /**
   * Handles the user created event
   * @param event - Event containing the created user
   */
  async handle(event: ExpenseCreatedEvent): Promise<void> {
    this.logger.debug(
      `Handling ExpenseCreatedEvent for expense with id: ${event.expense.id}`,
    );

    this.eventBus.publish(
      new ExpenseCreatedIntegrationEvent(
        event.expense.id,
        event.expense.name.value,
        event.expense.amount.value,
        event.expense.amount.currency,
        event.expense.description,
        event.expense.date,
        event.expense.paidByUserId,
        event.expense.groupId,
        event.expense.createdAt,
        event.members,
      ),
    );
  }
}
