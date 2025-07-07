import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GroupUpdatedEvent } from 'src/groups/domain/events/group-updated.event';

@EventsHandler(GroupUpdatedEvent)
export class GroupUpdatedEventHandler
  implements IEventHandler<GroupUpdatedEvent>
{
  private readonly logger = new Logger(GroupUpdatedEventHandler.name);
  async handle(event: GroupUpdatedEvent): Promise<void> {
    this.logger.debug(
      `Group updated: ${JSON.stringify(event.group.toPrimitives())}`,
    );
  }
}
