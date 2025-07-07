import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DebtsRepository } from '../../ports/debts.repository';
import { Logger } from '@nestjs/common';
import { GetDebtsByUserIdQuery } from './get-debts-by-user-id.query';
import { Debt } from 'src/debts/domain/entities/debt';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';

@QueryHandler(GetDebtsByUserIdQuery)
export class GetDebtsByUserIdQueryHandler
  implements IQueryHandler<GetDebtsByUserIdQuery>
{
  private readonly logger = new Logger(GetDebtsByUserIdQueryHandler.name);

  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtsCacheRepository: DebtsCacheRepository,
  ) {}

  async execute(query: GetDebtsByUserIdQuery): Promise<Debt[]> {
    this.logger.log(`Getting debts by userId: ${query.userId}`);
    const debts = await this.debtsRepository.findByUserId(
      query.userId,
      query.fromDate,
      query.toDate,
    );
    this.logger.debug(`Found ${debts.length} debts`);

    // TODO: Cache the result

    return debts;
  }
}
