import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PromptUpdatedEvent } from 'src/prompts/domain/events/prompt-updated/prompt-updated.event';

@EventsHandler(PromptUpdatedEvent)
export class PromptUpdatedEventHandler
  implements IEventHandler<PromptUpdatedEvent>
{
  private readonly logger = new Logger(PromptUpdatedEventHandler.name);

  async handle(event: PromptUpdatedEvent): Promise<void> {
    this.logger.debug(
      `Prompt created: ${JSON.stringify(event.prompt.toPrimitives())}`,
    );
  }
}
