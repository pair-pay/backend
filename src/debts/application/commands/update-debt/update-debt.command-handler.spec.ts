import { UpdateDebtCommandHandler } from './update-debt.command-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { EventBus } from '@nestjs/cqrs';
import { UpdateDebtCommand } from './update-debt.command';
import { Debt } from 'src/debts/domain/entities/debt';
import { UpdatedDebtEvent } from 'src/debts/domain/events/updated-debt/updated-debt.event';
import { NotFoundException } from '@nestjs/common';

const mockDebt = { id: '1', update: jest.fn() } as unknown as Debt;
const mockUpdatedDebt = { id: '1' } as unknown as Debt;
const mockData = { id: '1', amount: 200 };

describe('UpdateDebtCommandHandler', () => {
  let handler: UpdateDebtCommandHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;
  let debtsCacheRepository: jest.Mocked<DebtsCacheRepository>;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    debtsRepository = { findById: jest.fn(), update: jest.fn() } as any;
    debtsCacheRepository = { set: jest.fn() } as any;
    eventBus = { publish: jest.fn() } as any;
    handler = new UpdateDebtCommandHandler(
      debtsRepository,
      debtsCacheRepository,
      eventBus,
    );
  });

  it('should update, cache, and publish event for a debt', async () => {
    debtsRepository.findById.mockResolvedValue(mockDebt);
    (mockDebt.update as jest.Mock).mockReturnValue(mockUpdatedDebt);
    debtsRepository.update.mockResolvedValue(mockUpdatedDebt);
    debtsCacheRepository.set.mockResolvedValue(undefined);

    const command = new UpdateDebtCommand(mockData);
    const result = await handler.execute(command);

    expect(debtsRepository.findById).toHaveBeenCalledWith('1');
    expect(mockDebt.update).toHaveBeenCalledWith(mockData);
    expect(debtsRepository.update).toHaveBeenCalledWith(mockUpdatedDebt);
    expect(debtsCacheRepository.set).toHaveBeenCalledWith('1', mockUpdatedDebt);
    expect(eventBus.publish).toHaveBeenCalledWith(expect.any(UpdatedDebtEvent));
    expect(result).toBe(mockUpdatedDebt);
  });

  it('should throw NotFoundException if debt not found', async () => {
    debtsRepository.findById.mockResolvedValue(null);
    const command = new UpdateDebtCommand(mockData);
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should propagate errors from repository', async () => {
    debtsRepository.findById.mockResolvedValue(mockDebt);
    (mockDebt.update as jest.Mock).mockReturnValue(mockUpdatedDebt);
    debtsRepository.update.mockRejectedValue(new Error('fail'));
    const command = new UpdateDebtCommand(mockData);
    await expect(handler.execute(command)).rejects.toThrow('fail');
  });

  it('should propagate errors from cache', async () => {
    debtsRepository.findById.mockResolvedValue(mockDebt);
    (mockDebt.update as jest.Mock).mockReturnValue(mockUpdatedDebt);
    debtsRepository.update.mockResolvedValue(mockUpdatedDebt);
    debtsCacheRepository.set.mockRejectedValue(new Error('cache fail'));
    const command = new UpdateDebtCommand(mockData);
    await expect(handler.execute(command)).rejects.toThrow('cache fail');
  });
});
