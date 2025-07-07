import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserUpdatedEvent } from '../../domain/events/user-updated.event';

/**
 * Event handler responsible for handling user update events
 */
@EventsHandler(UserUpdatedEvent)
export class UserUpdatedEventHandler
  implements IEventHandler<UserUpdatedEvent>
{
  private readonly logger = new Logger(UserUpdatedEventHandler.name);

  /**
   * Handles the user updated event
   * @param event - Event containing the updated user
   */
  async handle(event: UserUpdatedEvent): Promise<void> {
    this.logger.debug(
      `Handling UserUpdatedEvent for user with id: ${event.user.id}`,
    );

    this.logger.debug(`User updated: ${event.user.toPrimitives()}`);

    // Implement your event handling logic here
    // Example: Update cache, send notifications, etc.
  }
}
