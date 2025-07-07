import { MembershipTypeOrmEntity } from './membership-type-orm.entity';

describe('MembershipTypeOrmEntity', () => {
  it('should create an entity with all properties', () => {
    const entity = new MembershipTypeOrmEntity();
    entity.id = '1';
    entity.groupId = 'g1';
    entity.userId = 'u1';
    entity.createdAt = '2024-01-01T00:00:00.000Z';
    entity.updatedAt = '2024-01-02T00:00:00.000Z';
    expect(entity.id).toBe('1');
    expect(entity.groupId).toBe('g1');
    expect(entity.userId).toBe('u1');
    expect(entity.createdAt).toBe('2024-01-01T00:00:00.000Z');
    expect(entity.updatedAt).toBe('2024-01-02T00:00:00.000Z');
  });

  it('should have createdAt and updatedAt undefined if not set (TypeORM default)', () => {
    const entity = new MembershipTypeOrmEntity();
    entity.id = '2';
    entity.groupId = 'g2';
    entity.userId = 'u2';
    // No asignamos createdAt ni updatedAt
    expect(entity.createdAt).toBeUndefined();
    expect(entity.updatedAt).toBeUndefined();
  });
});
