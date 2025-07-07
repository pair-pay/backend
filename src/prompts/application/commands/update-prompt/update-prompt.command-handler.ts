import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { PromptRepository } from '../../ports/prompt.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { UpdatePromptCommand } from './update-prompt.command';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

@CommandHandler(UpdatePromptCommand)
export class UpdatePromptCommandHandler
  implements ICommandHandler<UpdatePromptCommand>
{
  private readonly logger = new Logger(UpdatePromptCommandHandler.name);

  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(command: UpdatePromptCommand): Promise<Prompt> {
    this.logger.debug('Executing UpdatePromptCommand');

    const prompt = await this.promptRepository.findById(command.id);
    if (!prompt) throw new NotFoundException('Prompt not found');

    const promptToUpdate = prompt.update(command.prompt);

    const updatedPrompt = await this.promptRepository.update(promptToUpdate);

    return updatedPrompt;
  }
}
