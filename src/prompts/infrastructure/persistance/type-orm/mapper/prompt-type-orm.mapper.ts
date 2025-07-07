import { Prompt } from 'src/prompts/domain/entities/prompt.entity';
import { PromptTypeOrmEntity } from '../entities/prompt-type-orm.entity';

export class TypeOrmPromptsMapper {
  static toDomain(entity: PromptTypeOrmEntity): Prompt {
    return Prompt.fromPrimitives(entity);
  }
  static toPersistence(domain: Prompt): PromptTypeOrmEntity {
    return domain.toPrimitives();
  }
}
