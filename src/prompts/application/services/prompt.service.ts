import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Prompt } from '../../domain/entities/prompt.entity';
import { GetAllPromptsQuery } from '../queries/get-all-prompts/get-all-prompts.query';
import { GetPromptByIdQuery } from '../queries/get-prompt-by-id/get-prompt-by-id.query';
import { CreatePromptCommand } from '../commands/create-prompt/create-prompt.command';
import { DeletePromptCommand } from '../commands/delete-prompt/delete-prompt.command';
import { UpdatePromptCommand } from '../commands/update-prompt/update-prompt.command';

@Injectable()
export class PromptService {
  private readonly logger = new Logger(PromptService.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findAll(getAllPromptsQuery: GetAllPromptsQuery): Promise<Prompt[]> {
    return this.queryBus.execute(getAllPromptsQuery);
  }

  async findById(getPromptByIdQuery: GetPromptByIdQuery): Promise<Prompt> {
    return this.queryBus.execute(getPromptByIdQuery);
  }

  async createPrompt(
    createPromptCommand: CreatePromptCommand,
  ): Promise<Prompt> {
    return this.commandBus.execute(createPromptCommand);
  }

  async updatePrompt(
    updatePromptCommand: UpdatePromptCommand,
  ): Promise<Prompt> {
    return this.commandBus.execute(updatePromptCommand);
  }

  async deletePrompt(
    deletePromptCommand: DeletePromptCommand,
  ): Promise<Prompt> {
    return this.commandBus.execute(deletePromptCommand);
  }
}
