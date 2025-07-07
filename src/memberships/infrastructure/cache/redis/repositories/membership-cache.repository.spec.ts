import { MembershipRedisCacheRepository } from './membership-cache.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { MembershipRedisCacheMapper } from '../mapper/membership-cache.mapper';

// Mock para Redis y MembershipRedisCacheMapper
const mockRedis = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  flushdb: jest.fn(),
};

jest.mock('../mapper/membership-cache.mapper');

const mockMembership: Membership = {
  // ...add required properties for Membership entity here
} as unknown as Membership;

describe('MembershipRedisCacheRepository', () => {
  let repository: MembershipRedisCacheRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new MembershipRedisCacheRepository(mockRedis as any);
  });

  describe('get', () => {
    it('should return null if not found', async () => {
      mockRedis.get.mockResolvedValue(null);
      const result = await repository.get('key');
      expect(result).toBeNull();
    });
    it('should return membership if found', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify({ foo: 'bar' }));
      (MembershipRedisCacheMapper.toDomain as jest.Mock).mockReturnValue(
        mockMembership,
      );
      const result = await repository.get('key');
      expect(result).toBe(mockMembership);
    });
  });

  describe('set', () => {
    it('should set membership with default TTL', async () => {
      await repository.set('key', mockMembership);
      expect(mockRedis.set).toHaveBeenCalledWith(
        'key',
        JSON.stringify(mockMembership),
        'EX',
        expect.any(Number),
      );
    });
    it('should set membership with custom TTL', async () => {
      await repository.set('key', mockMembership, 99);
      expect(mockRedis.set).toHaveBeenCalledWith(
        'key',
        JSON.stringify(mockMembership),
        'EX',
        99,
      );
    });
  });

  describe('delete', () => {
    it('should delete membership', async () => {
      await repository.delete('key');
      expect(mockRedis.del).toHaveBeenCalledWith('key');
    });
  });

  describe('clear', () => {
    it('should clear all cache', async () => {
      await repository.clear();
      expect(mockRedis.flushdb).toHaveBeenCalled();
    });
  });
});
