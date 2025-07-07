import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { UserCreatedIntegrationEvent } from '../events/user-created.integration-event';

/**
 * Event handler responsible for handling user creation events
 */
@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  private readonly logger = new Logger(UserCreatedEventHandler.name);

  constructor(private readonly eventBus: EventBus) {}

  /**
   * Handles the user created event
   * @param event - Event containing the created user
   */
  async handle(event: UserCreatedEvent): Promise<void> {
    this.logger.debug(
      `Handling UserCreatedEvent for user with id: ${event.user.id}`,
    );

    this.eventBus.publish(
      new UserCreatedIntegrationEvent(
        event.user.id,
        event.user.name.value,
        event.user.createdAt,
      ),
    );
  }
}
