import { Debt } from '../../../../domain/entities/debt';
import { DebtInMemoryCacheEntity } from '../entities/debt-in-memory-cache.entity';
import { DebtInMemoryCacheMapper } from '../mapper/debt-in-memory-cache.mapper';
import { DebtsInMemoryCacheRepository } from './debt-in-memory-cache.repository';

jest.mock('../../mapper/debt-in-memory-cache.mapper');

const mockDebt: Debt = { id: '1' } as unknown as Debt;
const mockEntity: DebtInMemoryCacheEntity = {
  id: '1',
  expenseId: 'e1',
  fromUserId: 'u1',
  toUserId: 'u2',
  amount: 100,
  currency: 'EUR',
  status: 'pending',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-02'),
};

describe('DebtInMemoryCacheRepository', () => {
  let repo: DebtsInMemoryCacheRepository;

  beforeEach(() => {
    repo = new DebtsInMemoryCacheRepository();
    jest.clearAllMocks();
  });

  it('should set and get a debt', async () => {
    (DebtInMemoryCacheMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    (DebtInMemoryCacheMapper.toDomain as jest.Mock).mockReturnValue(mockDebt);
    await repo.set('1', mockDebt);
    const result = await repo.get('1');
    expect(result).toBe(mockDebt);
  });

  it('should return null if not found', async () => {
    const result = await repo.get('not-exist');
    expect(result).toBeNull();
  });

  it('should delete a debt', async () => {
    (DebtInMemoryCacheMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    await repo.set('1', mockDebt);
    await repo.delete('1');
    const result = await repo.get('1');
    expect(result).toBeNull();
  });

  it('should clear all debts', async () => {
    (DebtInMemoryCacheMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    await repo.set('1', mockDebt);
    await repo.set('2', mockDebt);
    await repo.clear();
    expect(await repo.get('1')).toBeNull();
    expect(await repo.get('2')).toBeNull();
  });
});
