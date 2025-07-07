import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { PromptRepository } from '../../ports/prompt.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/application/ports/user.repository';
import { GroupRepository } from 'src/groups/application/ports/group.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { DeletePromptCommand } from './delete-prompt.command';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

@CommandHandler(DeletePromptCommand)
export class DeletePromptCommandHandler
  implements ICommandHandler<DeletePromptCommand>
{
  private readonly logger = new Logger(DeletePromptCommandHandler.name);

  constructor(private readonly promptRepository: PromptRepository) {}

  async execute(command: DeletePromptCommand): Promise<Prompt> {
    this.logger.debug('Executing DeletePromptCommand');

    const prompt = await this.promptRepository.findById(command.id);
    if (!prompt) throw new NotFoundException('Prompt not found');

    const deletedPrompt = await this.promptRepository.delete(prompt.id);

    return deletedPrompt;
  }
}
