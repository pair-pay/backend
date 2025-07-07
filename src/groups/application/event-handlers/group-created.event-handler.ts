import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GroupCreatedEvent } from 'src/groups/domain/events/group-created.event';
import { GroupCreatedIntegrationEvent } from '../events/group-created.integration-event';

@EventsHandler(GroupCreatedEvent)
export class GroupCreatedEventHandler
  implements IEventHandler<GroupCreatedEvent>
{
  private readonly logger = new Logger(GroupCreatedEventHandler.name);

  constructor(private readonly eventBus: EventBus) {}

  async handle(event: GroupCreatedEvent): Promise<void> {
    this.logger.debug(
      `Group created: ${JSON.stringify(event.group.toPrimitives())}`,
    );

    this.eventBus.publish(
      new GroupCreatedIntegrationEvent(
        event.group.id,
        event.group.name.value,
        event.group.createdAt,
      ),
    );
  }
}
