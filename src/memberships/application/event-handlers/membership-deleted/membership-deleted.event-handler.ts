import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GroupDeletedEvent } from 'src/groups/domain/events/group-deleted.event';
import { MembershipDeletedEvent } from 'src/memberships/domain/events/membership-deleted/membership-deleted.event';

@EventsHandler(MembershipDeletedEvent)
export class MembershipDeletedEventHandler
  implements IEventHandler<MembershipDeletedEvent>
{
  private readonly logger = new Logger(MembershipDeletedEventHandler.name);
  async handle(event: MembershipDeletedEvent): Promise<void> {
    this.logger.debug(
      `Membership deleted: ${JSON.stringify(event.membership.toPrimitives())}`,
    );
  }
}
