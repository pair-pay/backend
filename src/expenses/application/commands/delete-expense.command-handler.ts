import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { DeleteExpenseCommand } from './delete-expense.command';
import { ExpenseDeletedEvent } from 'src/expenses/domain/events/expense-deleted.event';
import { Expense } from 'src/expenses/domain/expense';

/**
 * Command handler responsible for deleting existing users
 */
@CommandHandler(DeleteExpenseCommand)
export class DeleteExpenseCommandHandler
  implements ICommandHandler<DeleteExpenseCommand>
{
  private readonly logger = new Logger(DeleteExpenseCommandHandler.name);

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteExpenseCommand): Promise<Expense> {
    this.logger.debug('Executing DeleteExpenseCommand');

    const expenseToDelete = await this.expenseRepository.findById(command.id);
    if (!expenseToDelete)
      throw new NotFoundException(`Expense with id ${command.id} not found`);

    const expenseDeleted = await this.expenseRepository.delete(
      expenseToDelete.id,
    );

    this.eventBus.publish(new ExpenseDeletedEvent(expenseDeleted));

    return expenseDeleted;
  }
}
