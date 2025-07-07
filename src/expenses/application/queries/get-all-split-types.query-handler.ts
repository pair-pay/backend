import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExpenseRepository } from '../ports/expense.repository';
import { GetAllExpensesQuery } from './get-all-expenses.query';
import { Logger } from '@nestjs/common';
import { Expense } from 'src/expenses/domain/expense';
import { GetAllSplitTypesQuery } from './get-all-split-types.query';
import { SPLIT_TYPES } from 'src/expenses/domain/constants/split-types.constant';

@QueryHandler(GetAllSplitTypesQuery)
export class GetAllSplitTypesQueryHandler
  implements IQueryHandler<GetAllSplitTypesQuery>
{
  private readonly logger = new Logger(GetAllSplitTypesQueryHandler.name);

  constructor() {}

  async execute(query: GetAllSplitTypesQuery): Promise<string[]> {
    this.logger.debug('Executing GetAllSplitTypesQuery');

    return Object.values(SPLIT_TYPES);
  }
}
