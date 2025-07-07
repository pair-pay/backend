import { DeleteDebtCommandHandler } from './delete-debt.command-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { EventBus } from '@nestjs/cqrs';
import { DeleteDebtCommand } from './delete-debt.command';
import { Debt } from 'src/debts/domain/entities/debt';
import { DeletedDebtEvent } from 'src/debts/domain/events/deleted-debt/deleted-debt.event';
import { NotFoundException } from '@nestjs/common';

const mockDebt = { id: '1' } as unknown as Debt;
const mockDeletedDebt = { id: '1' } as unknown as Debt;

describe('DeleteDebtCommandHandler', () => {
  let handler: DeleteDebtCommandHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;
  let debtsCacheRepository: jest.Mocked<DebtsCacheRepository>;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    debtsRepository = { findById: jest.fn(), delete: jest.fn() } as any;
    debtsCacheRepository = { delete: jest.fn() } as any;
    eventBus = { publish: jest.fn() } as any;
    handler = new DeleteDebtCommandHandler(
      debtsRepository,
      debtsCacheRepository,
      eventBus,
    );
  });

  it('should delete, remove from cache, and publish event for a debt', async () => {
    debtsRepository.findById.mockResolvedValue(mockDebt);
    debtsRepository.delete.mockResolvedValue(mockDeletedDebt);
    debtsCacheRepository.delete.mockResolvedValue(undefined);

    const command = new DeleteDebtCommand('1');
    const result = await handler.execute(command);

    expect(debtsRepository.findById).toHaveBeenCalledWith('1');
    expect(debtsRepository.delete).toHaveBeenCalledWith(mockDebt);
    expect(debtsCacheRepository.delete).toHaveBeenCalledWith('1');
    expect(eventBus.publish).toHaveBeenCalledWith(expect.any(DeletedDebtEvent));
    expect(result).toBe(mockDeletedDebt);
  });

  it('should throw NotFoundException if debt not found', async () => {
    debtsRepository.findById.mockResolvedValue(null);
    const command = new DeleteDebtCommand('1');
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should propagate errors from repository', async () => {
    debtsRepository.findById.mockResolvedValue(mockDebt);
    debtsRepository.delete.mockRejectedValue(new Error('fail'));
    const command = new DeleteDebtCommand('1');
    await expect(handler.execute(command)).rejects.toThrow('fail');
  });

  it('should propagate errors from cache', async () => {
    debtsRepository.findById.mockResolvedValue(mockDebt);
    debtsRepository.delete.mockResolvedValue(mockDeletedDebt);
    debtsCacheRepository.delete.mockRejectedValue(new Error('cache fail'));
    const command = new DeleteDebtCommand('1');
    await expect(handler.execute(command)).rejects.toThrow('cache fail');
  });
});
