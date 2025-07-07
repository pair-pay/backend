import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ExpenseDeletedEvent } from '../../domain/events/expense-deleted.event';

/**
 * Event handler responsible for handling user deletion events
 */
@EventsHandler(ExpenseDeletedEvent)
export class ExpenseDeletedEventHandler
  implements IEventHandler<ExpenseDeletedEvent>
{
  private readonly logger = new Logger(ExpenseDeletedEventHandler.name);

  /**
   * Handles the user deleted event
   * @param event - Event containing the deleted user
   */
  async handle(event: ExpenseDeletedEvent): Promise<void> {
    this.logger.debug(
      `Handling ExpenseDeletedEvent for expense with id: ${event.expense.id}`,
    );

    this.logger.debug(`Expense deleted: ${event.expense.toPrimitives()}`);

    // Implement your event handling logic here
    // Example: Remove from cache, send notifications, etc.
  }
}
