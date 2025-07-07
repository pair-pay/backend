import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DebtsRepository } from '../../ports/debts.repository';
import { Logger } from '@nestjs/common';
import { GetDebtsByExpenseIdAndUserIdAndStatusQuery } from './get-debts-by-expense-id-and-user-id-and-status.query';
import { Debt } from 'src/debts/domain/entities/debt';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';

@QueryHandler(GetDebtsByExpenseIdAndUserIdAndStatusQuery)
export class GetDebtsByExpenseIdAndUserIdAndStatusQueryHandler
  implements IQueryHandler<GetDebtsByExpenseIdAndUserIdAndStatusQuery>
{
  private readonly logger = new Logger(
    GetDebtsByExpenseIdAndUserIdAndStatusQueryHandler.name,
  );

  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtsCacheRepository: DebtsCacheRepository,
  ) {}

  async execute(
    query: GetDebtsByExpenseIdAndUserIdAndStatusQuery,
  ): Promise<Debt[]> {
    this.logger.log(
      `Getting debts by expenseId: ${query.expenseId}, userId: ${query.userId} and status: ${query.status}`,
    );
    const debts = await this.debtsRepository.findByExpenseIdAndUserIdAndStatus(
      query.expenseId,
      query.userId,
      query.status,
      query.fromDate,
      query.toDate,
    );
    this.logger.debug(`Found ${debts.length} debts`);

    // TODO: Cache the result

    return debts;
  }
}
