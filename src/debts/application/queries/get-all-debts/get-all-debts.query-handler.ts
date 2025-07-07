import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllDebtsQuery } from './get-all-debts.query';
import { Debt } from '../../../domain/entities/debt';
import { DebtsRepository } from '../../ports/debts.repository';
import { Logger } from '@nestjs/common';

@QueryHandler(GetAllDebtsQuery)
export class GetAllDebtsQueryHandler
  implements IQueryHandler<GetAllDebtsQuery>
{
  private readonly logger = new Logger(GetAllDebtsQueryHandler.name);

  constructor(private readonly debtsRepository: DebtsRepository) {}

  async execute(query: GetAllDebtsQuery): Promise<Debt[]> {
    this.logger.log(
      `Getting all debts from ${query.fromDate} to ${query.toDate}`,
    );

    const debts = await this.debtsRepository.findAll(
      query.fromDate,
      query.toDate,
    );

    this.logger.debug(`Found ${debts.length} debts`);
    return debts;
  }
}
