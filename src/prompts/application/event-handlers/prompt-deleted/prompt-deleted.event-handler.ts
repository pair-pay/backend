import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PromptDeletedEvent } from 'src/prompts/domain/events/prompt-deleted/prompt-deleted.event';

@EventsHandler(PromptDeletedEvent)
export class PromptDeletedEventHandler
  implements IEventHandler<PromptDeletedEvent>
{
  private readonly logger = new Logger(PromptDeletedEventHandler.name);
  async handle(event: PromptDeletedEvent): Promise<void> {
    this.logger.debug(
      `Prompt deleted: ${JSON.stringify(event.prompt.toPrimitives())}`,
    );
  }
}
