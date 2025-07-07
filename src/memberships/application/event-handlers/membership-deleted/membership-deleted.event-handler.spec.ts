import { MembershipDeletedEventHandler } from './membership-deleted.event-handler';
import { MembershipDeletedEvent } from '../../../domain/events/membership-deleted/membership-deleted.event';

describe('MembershipDeletedEventHandler', () => {
  it('should be defined and handle should not throw', async () => {
    const handler = new MembershipDeletedEventHandler();
    const event = {
      membership: { toPrimitives: () => ({}) },
    } as unknown as MembershipDeletedEvent;
    await expect(handler.handle(event)).resolves.not.toThrow();
  });
});
