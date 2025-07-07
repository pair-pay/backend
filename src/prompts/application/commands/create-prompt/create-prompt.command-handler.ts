import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { CreatePromptCommand } from './create-prompt.command';
import { PromptRepository } from '../../ports/prompt.repository';
import { Logger } from '@nestjs/common';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';
import { PromptFactory } from 'src/prompts/domain/factories/prompt.factory';
import { PromptCreatedEvent } from 'src/prompts/domain/events/prompt-created/prompt-created.event';

@CommandHandler(CreatePromptCommand)
export class CreatePromptCommandHandler
  implements ICommandHandler<CreatePromptCommand>
{
  private readonly logger = new Logger(CreatePromptCommandHandler.name);

  constructor(
    private readonly promptRepository: PromptRepository,
    private readonly promptFactory: PromptFactory,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: CreatePromptCommand): Promise<Prompt> {
    this.logger.debug('Executing CreatePromptCommand');

    // 1. Create the prompt
    const prompt = await this.promptFactory.create(command.prompt);

    // 2. TODO: Check if the prompt has a parent prompt

    // 3. Check if it has a parent prompt
    const createdPrompt = await this.promptRepository.create(prompt);

    // TODO: Implement cache
    // await this.promptCacheRepository.set(
    //   `prompt:${command.prompt.id}`,
    //   createdPrompt,
    // );

    // TODO: Implement event bus
    this.eventBus.publish(new PromptCreatedEvent(createdPrompt));

    return createdPrompt;
  }
}
