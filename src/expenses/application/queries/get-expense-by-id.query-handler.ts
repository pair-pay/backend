import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { GetExpenseByIdQuery } from './get-expense-by-id.query';
import { Expense } from 'src/expenses/domain/expense';
import { Logger } from '@nestjs/common';
import { ExpenseCacheRepository } from '../ports/expense-cache.repository';

@QueryHandler(GetExpenseByIdQuery)
export class GetExpenseByIdQueryHandler
  implements IQueryHandler<GetExpenseByIdQuery>
{
  private readonly logger = new Logger(GetExpenseByIdQueryHandler.name);

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly cacheRepository: ExpenseCacheRepository,
  ) {}

  async execute(query: GetExpenseByIdQuery): Promise<Expense> {
    this.logger.debug('Executing GetExpenseByIdQuery');

    const cachedExpense = await this.cacheRepository.get(query.id);

    if (cachedExpense) {
      this.logger.debug(
        `Expense found in cache: ${cachedExpense.toPrimitives()}`,
      );
      return cachedExpense;
    }

    const expense = await this.expenseRepository.findById(query.id);

    this.logger.debug(
      `Expense found: ${JSON.stringify(expense.toPrimitives())}`,
    );

    await this.cacheRepository.set(expense.id, expense);

    return expense;
  }
}
