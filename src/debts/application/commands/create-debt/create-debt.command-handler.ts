import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Debt } from '../../../domain/entities/debt';
import { CreateDebtCommand } from './create-debt.command';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { DebtFactory } from '../../../domain/factories/debt.factory';
import { CreatedDebtEvent } from '../../../domain/events/created-debt/created-debt.event';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateDebtCommand)
export class CreateDebtCommandHandler
  implements ICommandHandler<CreateDebtCommand>
{
  private readonly logger = new Logger(CreateDebtCommandHandler.name);

  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtsCacheRepository: DebtsCacheRepository,
    private readonly debtFactory: DebtFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateDebtCommand): Promise<Debt> {
    this.logger.debug(`Creating debt: ${JSON.stringify(command.data)}`);

    const debt = this.debtFactory.create(command.data);

    const createdDebt = await this.debtsRepository.create(debt);

    await this.debtsCacheRepository.set(createdDebt.id, createdDebt);

    this.eventBus.publish(new CreatedDebtEvent(createdDebt));

    return createdDebt;
  }
}
