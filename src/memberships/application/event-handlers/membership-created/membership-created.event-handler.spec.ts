import { MembershipCreatedEventHandler } from './membership-created.event-handler';
import { MembershipCreatedEvent } from '../../../domain/events/membership-created/membership-created.event';

describe('MembershipCreatedEventHandler', () => {
  it('should be defined and handle should not throw', async () => {
    const handler = new MembershipCreatedEventHandler();
    const event = {
      membership: { toPrimitives: () => ({}) },
    } as unknown as MembershipCreatedEvent;
    await expect(handler.handle(event)).resolves.not.toThrow();
  });
});
