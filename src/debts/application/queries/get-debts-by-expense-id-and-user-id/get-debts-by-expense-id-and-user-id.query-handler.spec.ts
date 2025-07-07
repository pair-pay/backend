import { GetDebtsByExpenseIdAndUserIdQueryHandler } from './get-debts-by-expense-id-and-user-id.query-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { GetDebtsByExpenseIdAndUserIdQuery } from './get-debts-by-expense-id-and-user-id.query';
import { Debt } from 'src/debts/domain/entities/debt';

describe('GetDebtsByExpenseIdAndUserIdQueryHandler', () => {
  let handler: GetDebtsByExpenseIdAndUserIdQueryHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;
  let debtsCacheRepository: jest.Mocked<DebtsCacheRepository>;

  beforeEach(() => {
    debtsRepository = { findByExpenseIdAndUserId: jest.fn() } as any;
    debtsCacheRepository = {} as any;
    handler = new GetDebtsByExpenseIdAndUserIdQueryHandler(
      debtsRepository,
      debtsCacheRepository,
    );
  });

  it('should return debt by expenseId and userId', async () => {
    const mockDebt = { id: '1' } as unknown as Debt;
    debtsRepository.findByExpenseIdAndUserId.mockResolvedValue(mockDebt);
    const query = new GetDebtsByExpenseIdAndUserIdQuery('e1', 'u1');
    const result = await handler.execute(query);
    expect(debtsRepository.findByExpenseIdAndUserId).toHaveBeenCalledWith(
      'e1',
      'u1',
      undefined,
      undefined,
    );
    expect(result).toBe(mockDebt);
  });

  it('should return null if not found', async () => {
    debtsRepository.findByExpenseIdAndUserId.mockResolvedValue(null);
    const query = new GetDebtsByExpenseIdAndUserIdQuery('e1', 'u1');
    const result = await handler.execute(query);
    expect(result).toBeNull();
  });

  it('should propagate errors from repository', async () => {
    debtsRepository.findByExpenseIdAndUserId.mockRejectedValue(
      new Error('fail'),
    );
    const query = new GetDebtsByExpenseIdAndUserIdQuery('e1', 'u1');
    await expect(handler.execute(query)).rejects.toThrow('fail');
  });
});
