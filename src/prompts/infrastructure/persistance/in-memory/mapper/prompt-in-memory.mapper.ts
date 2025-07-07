import { PromptInMemoryEntity } from '../entities/prompt-in-memory.entity';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

export class PromptInMemoryMapper {
  static toDomain(entity: PromptInMemoryEntity): Prompt {
    return Prompt.fromPrimitives({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      template: entity.template,
      parentId: entity.parentId,
      isDefault: entity.isDefault,
      version: entity.version,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
  static toPersistence(domain: Prompt): PromptInMemoryEntity {
    return domain.toPrimitives();
  }
}
