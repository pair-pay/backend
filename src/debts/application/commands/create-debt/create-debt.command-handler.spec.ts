import { CreateDebtCommandHandler } from './create-debt.command-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { DebtFactory } from 'src/debts/domain/factories/debt.factory';
import { EventBus } from '@nestjs/cqrs';
import { CreateDebtCommand } from './create-debt.command';
import { Debt } from 'src/debts/domain/entities/debt';
import { CreatedDebtEvent } from 'src/debts/domain/events/created-debt/created-debt.event';

const mockDebt = { id: '1' } as unknown as Debt;
const mockData = {
  amount: 100,
  currency: 'EUR',
  expenseId: 'e1',
  fromUserId: 'u1',
  toUserId: 'u2',
};

describe('CreateDebtCommandHandler', () => {
  let handler: CreateDebtCommandHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;
  let debtsCacheRepository: jest.Mocked<DebtsCacheRepository>;
  let debtFactory: jest.Mocked<DebtFactory>;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    debtsRepository = { create: jest.fn() } as any;
    debtsCacheRepository = { set: jest.fn() } as any;
    debtFactory = { create: jest.fn() } as any;
    eventBus = { publish: jest.fn() } as any;
    handler = new CreateDebtCommandHandler(
      debtsRepository,
      debtsCacheRepository,
      debtFactory,
      eventBus,
    );
  });

  it('should create, cache, and publish event for a debt', async () => {
    debtFactory.create.mockReturnValue(mockDebt);
    debtsRepository.create.mockResolvedValue(mockDebt);
    debtsCacheRepository.set.mockResolvedValue(undefined);

    const command = new CreateDebtCommand(mockData);
    const result = await handler.execute(command);

    expect(debtFactory.create).toHaveBeenCalledWith(mockData);
    expect(debtsRepository.create).toHaveBeenCalledWith(mockDebt);
    expect(debtsCacheRepository.set).toHaveBeenCalledWith('1', mockDebt);
    expect(eventBus.publish).toHaveBeenCalledWith(expect.any(CreatedDebtEvent));
    expect(result).toBe(mockDebt);
  });

  it('should propagate errors from repository', async () => {
    debtFactory.create.mockReturnValue(mockDebt);
    debtsRepository.create.mockRejectedValue(new Error('fail'));
    const command = new CreateDebtCommand(mockData);
    await expect(handler.execute(command)).rejects.toThrow('fail');
  });

  it('should propagate errors from cache', async () => {
    debtFactory.create.mockReturnValue(mockDebt);
    debtsRepository.create.mockResolvedValue(mockDebt);
    debtsCacheRepository.set.mockRejectedValue(new Error('cache fail'));
    const command = new CreateDebtCommand(mockData);
    await expect(handler.execute(command)).rejects.toThrow('cache fail');
  });
});
