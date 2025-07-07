import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { UpdateExpenseCommand } from './update-expense.command';
import { ExpenseCacheRepository } from '../ports/expense-cache.repository';
import { Expense } from 'src/expenses/domain/expense';
import { ExpenseUpdatedEvent } from 'src/expenses/domain/events/expense-updated.event';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';

/**
 * Command handler responsible for updating existing users
 */
@CommandHandler(UpdateExpenseCommand)
export class UpdateExpenseCommandHandler
  implements ICommandHandler<UpdateExpenseCommand>
{
  private readonly logger = new Logger(UpdateExpenseCommandHandler.name);

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly cacheRepository: ExpenseCacheRepository,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: UpdateExpenseCommand): Promise<Expense> {
    this.logger.debug('Executing UpdateExpenseCommand');

    const expenseToUpdate = await this.expenseRepository.findById(command.id);

    if (!expenseToUpdate)
      throw new NotFoundException(`Expense with id ${command.id} not found`);

    if (command.data.paidByUserId !== expenseToUpdate.paidByUserId) {
      const paidByUser = await this.queryBus.execute(
        new GetUserByIdQuery(command.data.paidByUserId),
      );
      if (!paidByUser)
        throw new NotFoundException(
          `User with id ${command.data.paidByUserId} not found`,
        );
    }

    if (command.data.groupId !== expenseToUpdate.groupId) {
      const group = await this.queryBus.execute(
        new GetGroupByIdQuery(command.data.groupId),
      );
      if (!group)
        throw new NotFoundException(
          `Group with id ${command.data.groupId} not found`,
        );
    }

    const expense = expenseToUpdate.update(command.data);

    const expenseUpdated = await this.expenseRepository.update(expense);

    await this.cacheRepository.set(expenseUpdated.id, expenseUpdated);

    this.eventBus.publish(new ExpenseUpdatedEvent(expenseUpdated));

    return expenseUpdated;
  }
}
