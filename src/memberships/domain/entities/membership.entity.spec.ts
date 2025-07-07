import { Membership } from './membership.entity';
import { MembershipPrimitive } from '../primitives/membership.primitive';

/**
 * @file Unit tests for the Membership domain entity.
 */

describe('Membership', () => {
  const primitive: MembershipPrimitive = {
    id: 'membership-1',
    groupId: 'group-1',
    userId: 'user-1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
  };

  it('should create a Membership from primitives', () => {
    const membership = Membership.fromPrimitives(primitive);
    expect(membership).toBeInstanceOf(Membership);
    expect(membership.id).toBe(primitive.id);
    expect(membership.groupId).toBe(primitive.groupId);
    expect(membership.userId).toBe(primitive.userId);
    expect(membership.createdAt.toISOString()).toBe(primitive.createdAt);
    expect(membership.updatedAt.toISOString()).toBe(primitive.updatedAt);
  });

  it('should convert a Membership to primitives', () => {
    const membership = Membership.fromPrimitives(primitive);
    const result = membership.toPrimitives();
    expect(result).toEqual(primitive);
  });
});
