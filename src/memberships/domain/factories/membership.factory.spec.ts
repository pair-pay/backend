import { MembershipFactory } from './membership.factory';
import { Membership } from '../entities/membership.entity';

describe('MembershipFactory', () => {
  it('should create a Membership with provided groupId and userId', () => {
    const factory = new MembershipFactory();
    const groupId = 'group-1';
    const userId = 'user-1';
    const membership = factory.create({ groupId, userId });

    expect(membership).toBeInstanceOf(Membership);
    expect(membership.groupId).toBe(groupId);
    expect(membership.userId).toBe(userId);
    expect(typeof membership.id).toBe('string');
    expect(membership.createdAt).toBeInstanceOf(Date);
    expect(membership.updatedAt).toBeInstanceOf(Date);
  });
});
