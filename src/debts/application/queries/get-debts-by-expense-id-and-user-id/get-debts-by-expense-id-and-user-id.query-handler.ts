import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DebtsRepository } from '../../ports/debts.repository';
import { Logger } from '@nestjs/common';
import { GetDebtsByExpenseIdAndUserIdQuery } from './get-debts-by-expense-id-and-user-id.query';
import { Debt } from 'src/debts/domain/entities/debt';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';

@QueryHandler(GetDebtsByExpenseIdAndUserIdQuery)
export class GetDebtsByExpenseIdAndUserIdQueryHandler
  implements IQueryHandler<GetDebtsByExpenseIdAndUserIdQuery>
{
  private readonly logger = new Logger(
    GetDebtsByExpenseIdAndUserIdQueryHandler.name,
  );

  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtsCacheRepository: DebtsCacheRepository,
  ) {}

  async execute(
    query: GetDebtsByExpenseIdAndUserIdQuery,
  ): Promise<Debt | null> {
    this.logger.log(
      `Getting debt by expenseId: ${query.expenseId} and userId: ${query.userId}`,
    );
    const debt = await this.debtsRepository.findByExpenseIdAndUserId(
      query.expenseId,
      query.userId,
      query.fromDate,
      query.toDate,
    );
    this.logger.debug(`Debt found: ${debt ? 'yes' : 'no'}`);

    // TODO: Cache the result

    return debt;
  }
}
