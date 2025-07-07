import { GetDebtsByExpenseIdAndUserIdAndStatusQueryHandler } from './get-debts-by-expense-id-and-user-id-and-status.query-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { GetDebtsByExpenseIdAndUserIdAndStatusQuery } from './get-debts-by-expense-id-and-user-id-and-status.query';
import { Debt } from 'src/debts/domain/entities/debt';

describe('GetDebtsByExpenseIdAndUserIdAndStatusQueryHandler', () => {
  let handler: GetDebtsByExpenseIdAndUserIdAndStatusQueryHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;
  let debtsCacheRepository: jest.Mocked<DebtsCacheRepository>;

  beforeEach(() => {
    debtsRepository = { findByExpenseIdAndUserIdAndStatus: jest.fn() } as any;
    debtsCacheRepository = {} as any;
    handler = new GetDebtsByExpenseIdAndUserIdAndStatusQueryHandler(
      debtsRepository,
      debtsCacheRepository,
    );
  });

  it('should return debts by expenseId, userId and status', async () => {
    const mockDebts = [{ id: '1' }] as unknown as Debt[];
    debtsRepository.findByExpenseIdAndUserIdAndStatus.mockResolvedValue(
      mockDebts,
    );
    const query = new GetDebtsByExpenseIdAndUserIdAndStatusQuery(
      'e1',
      'u1',
      'pending',
    );
    const result = await handler.execute(query);
    expect(
      debtsRepository.findByExpenseIdAndUserIdAndStatus,
    ).toHaveBeenCalledWith('e1', 'u1', 'pending', undefined, undefined);
    expect(result).toBe(mockDebts);
  });

  it('should propagate errors from repository', async () => {
    debtsRepository.findByExpenseIdAndUserIdAndStatus.mockRejectedValue(
      new Error('fail'),
    );
    const query = new GetDebtsByExpenseIdAndUserIdAndStatusQuery(
      'e1',
      'u1',
      'pending',
    );
    await expect(handler.execute(query)).rejects.toThrow('fail');
  });
});
