import { Prompt } from 'src/prompts/domain/entities/prompt.entity';
import { PromptRedisCacheEntity } from '../entities/prompt-redis-cache.entity';

export class PromptRedisCacheMapper {
  static toDomain(entity: PromptRedisCacheEntity): Prompt {
    return Prompt.fromPrimitives(entity);
  }
  static toPersistence(domain: Prompt): PromptRedisCacheEntity {
    return domain.toPrimitives();
  }
}
