import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DebtsRepository } from '../../ports/debts.repository';
import { Logger } from '@nestjs/common';
import { GetDebtsByUserIdQuery } from '../get-debts-by-user-id/get-debts-by-user-id.query';
import { Debt } from 'src/debts/domain/entities/debt';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { GetDebtsByExpenseIdQuery } from './get-debts-by-expense-id.query';

@QueryHandler(GetDebtsByExpenseIdQuery)
export class GetDebtsByExpenseIdQueryHandler
  implements IQueryHandler<GetDebtsByExpenseIdQuery>
{
  private readonly logger = new Logger(GetDebtsByExpenseIdQueryHandler.name);

  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtsCacheRepository: DebtsCacheRepository,
  ) {}

  async execute(query: GetDebtsByExpenseIdQuery): Promise<Debt[]> {
    this.logger.log(`Getting debts by expenseId: ${query.expenseId}`);
    const debts = await this.debtsRepository.findByExpenseId(
      query.expenseId,
      query.fromDate,
      query.toDate,
    );

    this.logger.debug(`Found ${debts.length} debts`);

    // TODO: Cache the result

    return debts;
  }
}
