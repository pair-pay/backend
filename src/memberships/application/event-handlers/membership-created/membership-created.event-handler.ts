import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GroupCreatedEvent } from 'src/groups/domain/events/group-created.event';
import { MembershipCreatedEvent } from 'src/memberships/domain/events/membership-created/membership-created.event';

@EventsHandler(MembershipCreatedEvent)
export class MembershipCreatedEventHandler
  implements IEventHandler<MembershipCreatedEvent>
{
  private readonly logger = new Logger(MembershipCreatedEventHandler.name);

  async handle(event: MembershipCreatedEvent): Promise<void> {
    this.logger.debug(
      `Membership created: ${JSON.stringify(event.membership.toPrimitives())}`,
    );
  }
}
