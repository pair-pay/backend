import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PromptRepository } from '../../ports/prompt.repository';
import { GetPromptByIdQuery } from './get-prompt-by-id.query';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';
import { Logger } from '@nestjs/common';

@QueryHandler(GetPromptByIdQuery)
export class GetPromptByIdQueryHandler
  implements IQueryHandler<GetPromptByIdQuery>
{
  private readonly logger = new Logger(GetPromptByIdQueryHandler.name);
  constructor(private readonly promptRepository: PromptRepository) {}
  async execute(query: GetPromptByIdQuery): Promise<Prompt> {
    this.logger.debug('Executing GetPromptByIdQuery');

    //TODO: Cache the prompt by id

    return await this.promptRepository.findById(query.id);
  }
}
