import { PromptInMemoryCacheEntity } from '../entities/prompt-in-memory-cache.entity';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

export class PromptInMemoryCacheMapper {
  static toDomain(entity: PromptInMemoryCacheEntity): Prompt {
    return Prompt.fromPrimitives({
      id: entity.id,
      name: entity.name,
      template: entity.template,
      version: entity.version,
      isDefault: entity.isDefault,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      parentId: entity.parentId,
      description: entity.description,
    });
  }
  static toPersistence(domain: Prompt): PromptInMemoryCacheEntity {
    return domain.toPrimitives();
  }
}
