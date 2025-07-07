import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Debt } from '../../../domain/entities/debt';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { DeleteDebtCommand } from './delete-debt.command';
import { DeletedDebtEvent } from '../../../domain/events/deleted-debt/deleted-debt.event';

@CommandHandler(DeleteDebtCommand)
export class DeleteDebtCommandHandler
  implements ICommandHandler<DeleteDebtCommand>
{
  private readonly logger = new Logger(DeleteDebtCommandHandler.name);

  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtsCacheRepository: DebtsCacheRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteDebtCommand): Promise<Debt> {
    this.logger.debug(`Deleting debt: ${JSON.stringify(command.id)}`);

    const debt = await this.debtsRepository.findById(command.id);

    if (!debt) {
      throw new NotFoundException('Debt not found');
    }

    const deletedDebt = await this.debtsRepository.delete(debt);

    await this.debtsCacheRepository.delete(deletedDebt.id);

    this.eventBus.publish(new DeletedDebtEvent(debt));

    return deletedDebt;
  }
}
