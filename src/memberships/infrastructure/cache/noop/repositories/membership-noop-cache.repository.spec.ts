import { NoopMembershipCacheRepository } from './membership-noop-cache.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

describe('NoopMembershipCacheRepository', () => {
  let repository: NoopMembershipCacheRepository;

  beforeEach(() => {
    repository = new NoopMembershipCacheRepository();
  });

  it('get should always return null', async () => {
    const result = await repository.get('key');
    expect(result).toBeNull();
  });

  it('set should not throw', async () => {
    await expect(
      repository.set('key', {} as Membership),
    ).resolves.not.toThrow();
  });

  it('delete should not throw', async () => {
    await expect(repository.delete('key')).resolves.not.toThrow();
  });

  it('clear should not throw', async () => {
    await expect(repository.clear()).resolves.not.toThrow();
  });
});
