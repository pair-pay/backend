import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { CreateExpenseCommand } from './create-expense.command';
import { ExpenseFactory } from 'src/expenses/domain/factories/expense.factory';
import { Expense } from 'src/expenses/domain/expense';
import { ExpenseCreatedEvent } from 'src/expenses/domain/events/expense-created.event';
import { ExpenseCacheRepository } from '../ports/expense-cache.repository';
import { ExpenseSplitService } from 'src/expenses/domain/services/expense-split.service';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { GetMembershipByUserIdGroupIdQuery } from 'src/memberships/application/queries/get-membership-by-user-id-group-id/get-membership-by-user-id-group-id.query';
import { GetMembershipByGroupIdQuery } from 'src/memberships/application/queries/get-membership-by-group-id/get-membership-by-group-id.query';

/**
 * Command handler responsible for creating new users
 */
@CommandHandler(CreateExpenseCommand)
export class CreateExpenseCommandHandler
  implements ICommandHandler<CreateExpenseCommand>
{
  private readonly logger = new Logger(CreateExpenseCommandHandler.name);

  /**
   * Creates an instance of CreateUserCommandHandler
   * @param userRepository - Repository for user persistence operations
   * @param eventBus - Event bus for publishing domain events
   */
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly expenseFactory: ExpenseFactory,
    private readonly cacheRepository: ExpenseCacheRepository,
    private readonly queryBus: QueryBus,
    private readonly expenseSplitService: ExpenseSplitService,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Executes the create user command
   * @param command - Command containing data to create
   * @returns Created User domain object
   */
  async execute(command: CreateExpenseCommand): Promise<Expense> {
    this.logger.debug('Executing CreateExpenseCommand');

    const group = await this.queryBus.execute(
      new GetGroupByIdQuery(command.data.groupId),
    );
    if (!group)
      throw new NotFoundException(
        `Group with id ${command.data.groupId}${command.data.groupId} not found`,
      );

    const paidByUser = await this.queryBus.execute(
      new GetUserByIdQuery(command.data.paidByUserId),
    );
    if (!paidByUser)
      throw new NotFoundException(
        `User with id ${command.data.paidByUserId}${command.data.paidByUserId} not found`,
      );

    const members = await this.queryBus.execute(
      new GetMembershipByGroupIdQuery(command.data.groupId),
    );

    if (!members)
      throw new NotFoundException(
        `Membership with user id ${command.data.paidByUserId} and group id ${command.data.groupId} not found`,
      );

    const membersIds = members.map((member) => member.userId);

    const calculatedSplitBetweenAmounts = this.expenseSplitService.splitExpense(
      command.data.amount,
      command.data.currency,
      membersIds,
      command.data.splitType,
    );

    // 1. Create the expense
    const expense = this.expenseFactory.create({
      name: command.data.name,
      amount: command.data.amount,
      currency: command.data.currency,
      description: command.data.description,
      date: command.data.date,
      paidByUserId: command.data.paidByUserId,
      groupId: command.data.groupId,
      splitType: command.data.splitType,
    });

    // 2. Persist the expense
    const expenseCreated = await this.expenseRepository.create(expense);

    // 3. Publish the expense created event
    this.eventBus.publish(
      new ExpenseCreatedEvent(expenseCreated, calculatedSplitBetweenAmounts),
    );

    this.logger.debug(
      `Expense created: ${JSON.stringify(expenseCreated.toPrimitives())}`,
    );

    // 4. Cache the expense
    await this.cacheRepository.set(expenseCreated.id, expenseCreated);

    return expenseCreated;
  }
}
