import { GetDebtsByExpenseIdQueryHandler } from './get-debts-by-expense-id.query-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { DebtsCacheRepository } from '../../ports/debts-cache.repository';
import { GetDebtsByExpenseIdQuery } from './get-debts-by-expense-id.query';
import { Debt } from 'src/debts/domain/entities/debt';

describe('GetDebtsByExpenseIdQueryHandler', () => {
  let handler: GetDebtsByExpenseIdQueryHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;
  let debtsCacheRepository: jest.Mocked<DebtsCacheRepository>;

  beforeEach(() => {
    debtsRepository = { findByExpenseId: jest.fn() } as any;
    debtsCacheRepository = {} as any;
    handler = new GetDebtsByExpenseIdQueryHandler(
      debtsRepository,
      debtsCacheRepository,
    );
  });

  it('should return debts by expenseId', async () => {
    const mockDebts = [{ id: '1' }] as unknown as Debt[];
    debtsRepository.findByExpenseId.mockResolvedValue(mockDebts);
    const query = new GetDebtsByExpenseIdQuery('e1');
    const result = await handler.execute(query);
    expect(debtsRepository.findByExpenseId).toHaveBeenCalledWith(
      'e1',
      undefined,
      undefined,
    );
    expect(result).toBe(mockDebts);
  });

  it('should propagate errors from repository', async () => {
    debtsRepository.findByExpenseId.mockRejectedValue(new Error('fail'));
    const query = new GetDebtsByExpenseIdQuery('e1');
    await expect(handler.execute(query)).rejects.toThrow('fail');
  });
});
