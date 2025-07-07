import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { Logger } from '@nestjs/common';
import { GetExpenseByUserIdQuery } from './get-expense-by-user-id.query';
import { Expense } from 'src/expenses/domain/expense';
import { ExpenseCacheRepository } from '../ports/expense-cache.repository';

@QueryHandler(GetExpenseByUserIdQuery)
export class GetExpenseByUserIdQueryHandler
  implements IQueryHandler<GetExpenseByUserIdQuery>
{
  private readonly logger = new Logger(GetExpenseByUserIdQueryHandler.name);

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly cacheRepository: ExpenseCacheRepository,
  ) {}

  async execute(query: GetExpenseByUserIdQuery): Promise<Expense[]> {
    this.logger.debug('Executing GetExpenseByUserIdQuery');

    const expenses = await this.expenseRepository.findByUserId(
      query.userId,
      query.from,
      query.to,
    );

    this.logger.debug(`Expenses found: ${expenses.length}`);

    return expenses;
  }
}
