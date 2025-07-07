import { GetDebtsByUserIdQueryHandler } from './get-debts-by-user-id.query-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { GetDebtsByUserIdQuery } from './get-debts-by-user-id.query';
import { Debt } from 'src/debts/domain/entities/debt';

describe('GetDebtsByUserIdQueryHandler', () => {
  let handler: GetDebtsByUserIdQueryHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;
  let debtsCacheRepository: jest.Mocked<DebtsCacheRepository>;

  beforeEach(() => {
    debtsRepository = { findByUserId: jest.fn() } as any;
    debtsCacheRepository = {} as any;
    handler = new GetDebtsByUserIdQueryHandler(
      debtsRepository,
      debtsCacheRepository,
    );
  });

  it('should return debts by userId', async () => {
    const mockDebts = [{ id: '1' }] as unknown as Debt[];
    debtsRepository.findByUserId.mockResolvedValue(mockDebts);
    const query = new GetDebtsByUserIdQuery('u1');
    const result = await handler.execute(query);
    expect(debtsRepository.findByUserId).toHaveBeenCalledWith(
      'u1',
      undefined,
      undefined,
    );
    expect(result).toBe(mockDebts);
  });

  it('should propagate errors from repository', async () => {
    debtsRepository.findByUserId.mockRejectedValue(new Error('fail'));
    const query = new GetDebtsByUserIdQuery('u1');
    await expect(handler.execute(query)).rejects.toThrow('fail');
  });
});
