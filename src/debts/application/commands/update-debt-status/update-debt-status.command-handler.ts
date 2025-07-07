import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Debt } from '../../../domain/entities/debt';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { DebtFactory } from 'src/debts/domain/factories/debt.factory';
import { Logger, NotFoundException } from '@nestjs/common';
import { UpdateDebtStatusCommand } from './update-debt-status.command';
import { UpdatedDebtEvent } from 'src/debts/domain/events/updated-debt/updated-debt.event';

@CommandHandler(UpdateDebtStatusCommand)
export class UpdateDebtStatusCommandHandler
  implements ICommandHandler<UpdateDebtStatusCommand>
{
  private readonly logger = new Logger(UpdateDebtStatusCommandHandler.name);

  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtsCacheRepository: DebtsCacheRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateDebtStatusCommand): Promise<Debt> {
    this.logger.debug(`Updating debt: ${JSON.stringify(command.data)}`);

    const debtToUpdate = await this.debtsRepository.findById(command.data.id);

    if (!debtToUpdate) {
      throw new NotFoundException('Debt not found');
    }

    const debtWithUpdatedStatus = debtToUpdate.updateStatus(
      command.data.status,
    );

    const updatedDebt = await this.debtsRepository.update(
      debtWithUpdatedStatus,
    );

    await this.debtsCacheRepository.set(updatedDebt.id, updatedDebt);

    this.eventBus.publish(new UpdatedDebtEvent(updatedDebt));

    return updatedDebt;
  }
}
