import { Debt } from '../../../../domain/entities/debt';
import { DebtsNoopCacheRepository } from './debt-noop-cache.repository';

describe('DebtNoopCacheRepository', () => {
  let repo: DebtsNoopCacheRepository;

  beforeEach(() => {
    repo = new DebtsNoopCacheRepository();
  });

  it('get should always return null', async () => {
    const result = await repo.get('1');
    expect(result).toBeNull();
  });

  it('set should not throw', async () => {
    await expect(repo.set('1', {} as Debt)).resolves.not.toThrow();
  });

  it('delete should not throw', async () => {
    await expect(repo.delete('1')).resolves.not.toThrow();
  });

  it('clear should not throw', async () => {
    await expect(repo.clear()).resolves.not.toThrow();
  });
});
