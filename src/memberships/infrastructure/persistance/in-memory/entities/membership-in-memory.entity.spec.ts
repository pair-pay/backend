import { MembershipInMemoryEntity } from './membership-in-memory.entity';

describe('MembershipInMemoryEntity', () => {
  it('should create an entity with all properties', () => {
    const entity = new MembershipInMemoryEntity(
      '1',
      'g1',
      'u1',
      '2024-01-01T00:00:00.000Z',
      '2024-01-02T00:00:00.000Z',
    );
    expect(entity.id).toBe('1');
    expect(entity.groupId).toBe('g1');
    expect(entity.userId).toBe('u1');
    expect(entity.createdAt).toBe('2024-01-01T00:00:00.000Z');
    expect(entity.updatedAt).toBe('2024-01-02T00:00:00.000Z');
  });
});
