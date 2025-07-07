import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Debt } from '../../../domain/entities/debt';
import { DebtsRepository } from '../../ports/debts.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { GetDebtByIdQuery } from './get-debt-by-id.query';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';

@QueryHandler(GetDebtByIdQuery)
export class GetDebtByIdQueryHandler
  implements IQueryHandler<GetDebtByIdQuery>
{
  private readonly logger = new Logger(GetDebtByIdQueryHandler.name);

  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtsCacheRepository: DebtsCacheRepository,
  ) {}

  async execute(query: GetDebtByIdQuery): Promise<Debt> {
    this.logger.log(`Getting debt by id: ${query.id}`);

    const debt = await this.debtsRepository.findById(query.id);

    if (!debt) {
      throw new NotFoundException('Debt not found');
    }

    this.logger.debug(`Found debt: ${JSON.stringify(debt)}`);

    await this.debtsCacheRepository.set(debt.id, debt);

    return debt;
  }
}
