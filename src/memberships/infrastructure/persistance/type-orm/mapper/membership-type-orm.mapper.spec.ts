import { TypeOrmMembershipsMapper } from './membership-type-orm.mapper';
import { MembershipTypeOrmEntity } from '../entities/membership-type-orm.entity';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

describe('TypeOrmMembershipsMapper', () => {
  describe('toDomain', () => {
    it('should map entity to domain', () => {
      const entity: MembershipTypeOrmEntity = {
        id: '1',
        groupId: 'g1',
        userId: 'u1',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      } as MembershipTypeOrmEntity;
      const result = TypeOrmMembershipsMapper.toDomain(entity);
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
      const result = TypeOrmMembershipsMapper.toPersistence(domain);
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
