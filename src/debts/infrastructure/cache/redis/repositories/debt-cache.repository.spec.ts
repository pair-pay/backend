import { Debt } from '../../../../domain/entities/debt';
import { DebtRedisCacheMapper } from '../mapper/debt-cache.mapper';
import { DebtsRedisCacheRepository } from './debt-cache.repository';

const mockRedis = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  flushdb: jest.fn(),
};

jest.mock('../../mapper/debt-cache.mapper');

const mockDebt: Debt = { id: '1' } as unknown as Debt;

describe('DebtCacheRepository', () => {
  let repo: DebtsRedisCacheRepository;

  beforeEach(() => {
    repo = new DebtsRedisCacheRepository(mockRedis as any);
    jest.clearAllMocks();
  });

  it('should get a debt if found', async () => {
    mockRedis.get.mockResolvedValue(JSON.stringify({}));
    (DebtRedisCacheMapper.toDomain as jest.Mock).mockReturnValue(mockDebt);
    const result = await repo.get('1');
    expect(result).toBe(mockDebt);
  });

  it('should return null if not found', async () => {
    mockRedis.get.mockResolvedValue(null);
    const result = await repo.get('not-exist');
    expect(result).toBeNull();
  });

  it('should set a debt', async () => {
    await repo.set('1', mockDebt);
    expect(mockRedis.set).toHaveBeenCalled();
  });

  it('should delete a debt', async () => {
    await repo.delete('1');
    expect(mockRedis.del).toHaveBeenCalledWith('1');
  });

  it('should clear all debts', async () => {
    await repo.clear();
    expect(mockRedis.flushdb).toHaveBeenCalled();
  });
});
