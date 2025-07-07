import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { GetAllExpensesQuery } from './get-all-expenses.query';
import { Logger } from '@nestjs/common';
import { Expense } from 'src/expenses/domain/expense';

@QueryHandler(GetAllExpensesQuery)
export class GetAllExpensesQueryHandler
  implements IQueryHandler<GetAllExpensesQuery>
{
  private readonly logger = new Logger(GetAllExpensesQueryHandler.name);

  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(query: GetAllExpensesQuery): Promise<Expense[]> {
    this.logger.debug('Executing GetAllExpensesQuery');
    const expenses = await this.expenseRepository.findAll(query.from, query.to);

    this.logger.debug(`Found ${expenses.length} expenses`);

    return expenses;
  }
}
