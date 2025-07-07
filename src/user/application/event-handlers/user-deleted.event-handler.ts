import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserDeletedEvent } from '../../domain/events/user-deleted.event';

/**
 * Event handler responsible for handling user deletion events
 */
@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler
  implements IEventHandler<UserDeletedEvent>
{
  private readonly logger = new Logger(UserDeletedEventHandler.name);

  /**
   * Handles the user deleted event
   * @param event - Event containing the deleted user
   */
  async handle(event: UserDeletedEvent): Promise<void> {
    this.logger.debug(
      `Handling UserDeletedEvent for user with id: ${event.user.id}`,
    );

    this.logger.debug(`User deleted: ${event.user.toPrimitives()}`);

    // Implement your event handling logic here
    // Example: Remove from cache, send notifications, etc.
  }
}
