import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllExpensesQuery } from './queries/get-all-expenses.query';
import { GetExpenseByIdQuery } from './queries/get-expense-by-id.query';
import { CreateExpenseCommand } from './commands/create-expense.command';
import { UpdateExpenseCommand } from './commands/update-expense.command';
import { DeleteExpenseCommand } from './commands/delete-expense.command';
import { Expense } from '../domain/expense';
import { GetExpenseByUserIdQuery } from './queries/get-expense-by-user-id.query';
import { GetExpenseByGroupIdQuery } from './queries/get-expense-by-group-id.query';
import { UpdateExpenseAmountCommand } from './commands/update-expense-amount.command';
import { GetAllSplitTypesQuery } from './queries/get-all-split-types.query';

/**
 * Service class that handles trip-related operations using CQRS pattern
 */
@Injectable()
export class ExpenseService {
  /**
   * Creates an instance of UserService
   * @param commandBus - Bus for dispatching commands
   * @param queryBus - Bus for dispatching queries
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Retrieves all users
   * @param getAllUsersQuery - Query to get all users
   * @returns Promise containing array of User entities
   */
  public async getAll(
    getAllExpensesQuery: GetAllExpensesQuery,
  ): Promise<Expense[]> {
    return await this.queryBus.execute(getAllExpensesQuery);
  }

  /**
   * Finds a user by its ID
   * @param getUserByIdQuery - Query containing user ID to find
   * @returns Promise containing the found User entity
   */
  public async getById(
    getExpenseByIdQuery: GetExpenseByIdQuery,
  ): Promise<Expense> {
    return await this.queryBus.execute(getExpenseByIdQuery);
  }

  /**
   * Finds a user by its email
   * @param getUserByEmailQuery - Query containing user email to find
   * @returns Promise containing the found User entity
   */
  public async getByUserId(
    getExpenseByUserIdQuery: GetExpenseByUserIdQuery,
  ): Promise<Expense[]> {
    return await this.queryBus.execute(getExpenseByUserIdQuery);
  }

  public async getByGroupId(
    getExpenseByGroupIdQuery: GetExpenseByGroupIdQuery,
  ): Promise<Expense[]> {
    return await this.queryBus.execute(getExpenseByGroupIdQuery);
  }

  public async getSplitTypes(query: GetAllSplitTypesQuery): Promise<string[]> {
    return await this.queryBus.execute(query);
  }

  /**
   * Creates a new user
   * @param createUserCommand - Command containing user data to create
   * @returns Promise containing the created User entity
   */
  public async create(
    createExpenseCommand: CreateExpenseCommand,
  ): Promise<Expense> {
    return await this.commandBus.execute(createExpenseCommand);
  }

  /**
   * Updates an existing trip
   * @param updateUserCommand - Command containing user data to update
   * @returns Promise containing the updated User entity
   */
  public async update(
    updateExpenseCommand: UpdateExpenseCommand,
  ): Promise<Expense> {
    return await this.commandBus.execute(updateExpenseCommand);
  }

  /**
   * Updates the amount of an existing expense
   * @param updateExpenseAmountCommand - Command containing expense data to update
   * @returns Promise containing the updated Expense entity
   */
  public async updateAmount(
    updateExpenseAmountCommand: UpdateExpenseAmountCommand,
  ): Promise<Expense> {
    return await this.commandBus.execute(updateExpenseAmountCommand);
  }

  /**
   * Deletes an existing trip
   * @param deleteUserCommand - Command containing user ID to delete
   * @returns Promise containing the deleted User entity
   */
  public async delete(
    deleteExpenseCommand: DeleteExpenseCommand,
  ): Promise<Expense> {
    return await this.commandBus.execute(deleteExpenseCommand);
  }
}
