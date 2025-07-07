import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GroupDeletedEvent } from 'src/groups/domain/events/group-deleted.event';

@EventsHandler(GroupDeletedEvent)
export class GroupDeletedEventHandler
  implements IEventHandler<GroupDeletedEvent>
{
  private readonly logger = new Logger(GroupDeletedEventHandler.name);
  async handle(event: GroupDeletedEvent): Promise<void> {
    this.logger.debug(
      `Group deleted: ${JSON.stringify(event.group.toPrimitives())}`,
    );
  }
}
