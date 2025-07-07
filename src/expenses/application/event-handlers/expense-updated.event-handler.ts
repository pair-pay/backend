import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ExpenseUpdatedEvent } from '../../domain/events/expense-updated.event';

/**
 * Event handler responsible for handling user update events
 */
@EventsHandler(ExpenseUpdatedEvent)
export class ExpenseUpdatedEventHandler
  implements IEventHandler<ExpenseUpdatedEvent>
{
  private readonly logger = new Logger(ExpenseUpdatedEventHandler.name);

  /**
   * Handles the user updated event
   * @param event - Event containing the updated user
   */
  async handle(event: ExpenseUpdatedEvent): Promise<void> {
    this.logger.debug(
      `Handling ExpenseUpdatedEvent for expense with id: ${event.expense.id}`,
    );

    this.logger.debug(`Expense updated: ${event.expense.toPrimitives()}`);

    // Implement your event handling logic here
    // Example: Update cache, send notifications, etc.
  }
}
