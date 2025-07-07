import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PromptRepository } from '../../ports/prompt.repository';
import { GetAllPromptsQuery } from './get-all-prompts.query';
import { Group } from 'src/groups/domain/group';
import { Logger } from '@nestjs/common';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

@QueryHandler(GetAllPromptsQuery)
export class GetAllPromptsQueryHandler
  implements IQueryHandler<GetAllPromptsQuery>
{
  private readonly logger = new Logger(GetAllPromptsQueryHandler.name);
  constructor(private readonly promptRepository: PromptRepository) {}
  async execute(): Promise<Prompt[]> {
    this.logger.debug('Executing GetAllPromptsQuery');
    const prompts = await this.promptRepository.findAll();

    //TODO: Cache the prompts

    return prompts;
  }
}
