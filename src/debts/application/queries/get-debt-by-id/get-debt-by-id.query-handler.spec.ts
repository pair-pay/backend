import { GetDebtByIdQueryHandler } from './get-debt-by-id.query-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { GetDebtByIdQuery } from './get-debt-by-id.query';
import { Debt } from 'src/debts/domain/entities/debt';
import { NotFoundException } from '@nestjs/common';

const mockDebt = { id: '1' } as unknown as Debt;

describe('GetDebtByIdQueryHandler', () => {
  let handler: GetDebtByIdQueryHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;
  let debtsCacheRepository: jest.Mocked<DebtsCacheRepository>;

  beforeEach(() => {
    debtsRepository = { findById: jest.fn() } as any;
    debtsCacheRepository = { set: jest.fn() } as any;
    handler = new GetDebtByIdQueryHandler(
      debtsRepository,
      debtsCacheRepository,
    );
  });

  it('should return the debt and cache it', async () => {
    debtsRepository.findById.mockResolvedValue(mockDebt);
    debtsCacheRepository.set.mockResolvedValue(undefined);
    const query = new GetDebtByIdQuery('1');
    const result = await handler.execute(query);
    expect(debtsRepository.findById).toHaveBeenCalledWith('1');
    expect(debtsCacheRepository.set).toHaveBeenCalledWith('1', mockDebt);
    expect(result).toBe(mockDebt);
  });

  it('should throw NotFoundException if debt not found', async () => {
    debtsRepository.findById.mockResolvedValue(null);
    const query = new GetDebtByIdQuery('1');
    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
  });

  it('should propagate errors from repository', async () => {
    debtsRepository.findById.mockRejectedValue(new Error('fail'));
    const query = new GetDebtByIdQuery('1');
    await expect(handler.execute(query)).rejects.toThrow('fail');
  });
});
