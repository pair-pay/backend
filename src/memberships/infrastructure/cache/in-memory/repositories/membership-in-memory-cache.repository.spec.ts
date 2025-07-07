import { MembershipInMemoryCacheRepository } from './membership-in-memory-cache.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { MembershipInMemoryCacheMapper } from '../mapper/membership-in-memory-cache.mapper';
import { MembershipInMemoryCacheEntity } from '../entities/membership-in-memory-cache.entity';

// Mock para MembershipInMemoryCacheMapper
jest.mock('../mapper/membership-in-memory-cache.mapper');

const mockMembership: Membership = {
  // ...add required properties for Membership entity here
} as unknown as Membership;

const mockEntity: MembershipInMemoryCacheEntity = {
  // ...add required properties for MembershipInMemoryCacheEntity here
} as unknown as MembershipInMemoryCacheEntity;

describe('MembershipInMemoryCacheRepository', () => {
  let repository: MembershipInMemoryCacheRepository;

  beforeEach(() => {
    repository = new MembershipInMemoryCacheRepository();
    jest.clearAllMocks();
  });

  describe('set', () => {
    it('should set a membership in cache with default TTL', async () => {
      (
        MembershipInMemoryCacheMapper.toPersistence as jest.Mock
      ).mockReturnValue(mockEntity);
      await repository.set('key', mockMembership);
      expect(repository['cache'].has('key')).toBe(true);
    });
    it('should set a membership in cache with custom TTL', async () => {
      (
        MembershipInMemoryCacheMapper.toPersistence as jest.Mock
      ).mockReturnValue(mockEntity);
      await repository.set('key2', mockMembership, 10);
      expect(repository['cache'].has('key2')).toBe(true);
    });
  });

  describe('get', () => {
    it('should return null if key does not exist', async () => {
      const result = await repository.get('not-exist');
      expect(result).toBeNull();
    });
    it('should return null if cache expired', async () => {
      repository['cache'].set('expired', {
        data: mockEntity,
        ttl: Date.now() - 1000,
      });
      const result = await repository.get('expired');
      expect(result).toBeNull();
      expect(repository['cache'].has('expired')).toBe(false);
    });
    it('should return membership if cache is valid', async () => {
      (MembershipInMemoryCacheMapper.toDomain as jest.Mock).mockReturnValue(
        mockMembership,
      );
      repository['cache'].set('valid', {
        data: mockEntity,
        ttl: Date.now() + 10000,
      });
      const result = await repository.get('valid');
      expect(result).toBe(mockMembership);
    });
  });

  describe('delete', () => {
    it('should delete a membership from cache', async () => {
      repository['cache'].set('del', {
        data: mockEntity,
        ttl: Date.now() + 10000,
      });
      await repository.delete('del');
      expect(repository['cache'].has('del')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all cache', async () => {
      repository['cache'].set('a', {
        data: mockEntity,
        ttl: Date.now() + 10000,
      });
      repository['cache'].set('b', {
        data: mockEntity,
        ttl: Date.now() + 10000,
      });
      await repository.clear();
      expect(repository['cache'].size).toBe(0);
    });
  });
});
