import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { Logger } from '@nestjs/common';
import { Expense } from 'src/expenses/domain/expense';
import { GetExpenseByGroupIdQuery } from './get-expense-by-group-id.query';

@QueryHandler(GetExpenseByGroupIdQuery)
export class GetExpenseByGroupIdQueryHandler
  implements IQueryHandler<GetExpenseByGroupIdQuery>
{
  private readonly logger = new Logger(GetExpenseByGroupIdQueryHandler.name);

  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(query: GetExpenseByGroupIdQuery): Promise<Expense[]> {
    this.logger.debug('Executing GetExpenseByGroupIdQuery');

    const expenses = await this.expenseRepository.findByGroupId(
      query.groupId,
      query.from,
      query.to,
    );

    this.logger.debug(`Expenses found: ${expenses.length}`);

    return expenses;
  }
}
