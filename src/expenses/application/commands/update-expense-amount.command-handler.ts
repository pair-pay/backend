import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { UpdateExpenseAmountCommand } from './update-expense-amount.command';
import { ExpenseCacheRepository } from '../ports/expense-cache.repository';
import { Expense } from 'src/expenses/domain/expense';
import { ExpenseUpdatedEvent } from 'src/expenses/domain/events/expense-updated.event';
import { GetMembershipByGroupIdQuery } from 'src/memberships/application/queries/get-membership-by-group-id/get-membership-by-group-id.query';
import { ExpenseSplitService } from 'src/expenses/domain/services/expense-split.service';
import { ExpenseAmountUpdatedIntegrationEvent } from '../events/expense-amount-updated.integration-event';

/**
 * Command handler responsible for updating existing users
 */
@CommandHandler(UpdateExpenseAmountCommand)
export class UpdateExpenseAmountCommandHandler
  implements ICommandHandler<UpdateExpenseAmountCommand>
{
  private readonly logger = new Logger(UpdateExpenseAmountCommandHandler.name);

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly cacheRepository: ExpenseCacheRepository,
    private readonly expenseSplitService: ExpenseSplitService,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: UpdateExpenseAmountCommand): Promise<Expense> {
    this.logger.debug('Executing UpdateExpenseAmountCommand');

    const expenseToUpdate = await this.expenseRepository.findById(command.id);

    if (!expenseToUpdate)
      throw new NotFoundException(`Expense with id ${command.id} not found`);

    const members = await this.queryBus.execute(
      new GetMembershipByGroupIdQuery(expenseToUpdate.groupId),
    );

    if (!members)
      throw new NotFoundException(
        `Membership with group id ${expenseToUpdate.groupId} not found`,
      );

    const membersIds = members.map((member) => member.userId);

    const calculatedSplitBetweenAmounts = this.expenseSplitService.splitExpense(
      command.amount,
      command.currency,
      membersIds,
      expenseToUpdate.splitType.value,
    );

    const expense = expenseToUpdate.update({
      amount: command.amount,
      currency: command.currency,
    });

    const expenseUpdated = await this.expenseRepository.update(expense);

    await this.cacheRepository.set(expenseUpdated.id, expenseUpdated);

    this.eventBus.publish(new ExpenseUpdatedEvent(expenseUpdated));

    this.eventBus.publish(
      new ExpenseAmountUpdatedIntegrationEvent(
        expenseUpdated.id,
        expenseUpdated.name.value,
        expenseUpdated.amount.value,
        expenseUpdated.amount.currency,
        expenseUpdated.description,
        expenseUpdated.date,
        expenseUpdated.paidByUserId,
        expenseUpdated.groupId,
        expenseUpdated.createdAt,
        calculatedSplitBetweenAmounts,
      ),
    );
    this.logger.debug(
      `Published ExpenseAmountUpdatedIntegrationEvent for expense with id: ${expenseUpdated.id}`,
    );

    return expenseUpdated;
  }
}
