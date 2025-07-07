import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PromptCreatedEvent } from 'src/prompts/domain/events/prompt-created/prompt-created.event';

@EventsHandler(PromptCreatedEvent)
export class PromptCreatedEventHandler
  implements IEventHandler<PromptCreatedEvent>
{
  private readonly logger = new Logger(PromptCreatedEventHandler.name);

  async handle(event: PromptCreatedEvent): Promise<void> {
    this.logger.debug(
      `Prompt created: ${JSON.stringify(event.prompt.toPrimitives())}`,
    );
  }
}
