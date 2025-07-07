import { MembershipRedisCacheMapper } from './membership-cache.mapper';
import { MembershipRedisCacheEntity } from '../entities/membership-redis-cache.entity';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

describe('MembershipRedisCacheMapper', () => {
  describe('toDomain', () => {
    it('should map entity to domain', () => {
      const entity: MembershipRedisCacheEntity = {
        id: '1',
        groupId: 'g1',
        userId: 'u1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      };
      const result = MembershipRedisCacheMapper.toDomain(entity);
      expect(result).toBeInstanceOf(Membership);
      expect(result).toMatchObject({
        id: '1',
        groupId: 'g1',
        userId: 'u1',
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-02T00:00:00.000Z'),
      });
    });
  });

  describe('toPersistence', () => {
    it('should map domain to entity', () => {
      const domain = new Membership(
        '1',
        'g1',
        'u1',
        new Date('2024-01-01T00:00:00.000Z'),
        new Date('2024-01-02T00:00:00.000Z'),
      );
      const result = MembershipRedisCacheMapper.toPersistence(domain);
      expect(result).toEqual({
        id: '1',
        groupId: 'g1',
        userId: 'u1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      });
    });
  });
});
