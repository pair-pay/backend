import { Membership } from '../../entities/membership.entity';
import { MembershipCreatedEvent } from './membership-created.event';

describe('MembershipCreatedEvent', () => {
  it('should store the membership instance', () => {
    const membership = new Membership(
      'membership-1',
      'group-1',
      'user-1',
      new Date('2023-01-01T00:00:00.000Z'),
      new Date('2023-01-02T00:00:00.000Z'),
    );
    const event = new MembershipCreatedEvent(membership);
    expect(event.membership).toBe(membership);
  });
});
