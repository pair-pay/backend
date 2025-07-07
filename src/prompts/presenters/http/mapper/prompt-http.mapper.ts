import { Prompt } from '../../../domain/entities/prompt.entity';
import { PromptResponseDto } from '../dto/prompt-response.dto';

export class PromptHttpMapper {
  static toResponseDto(prompt: Prompt): PromptResponseDto {
    return {
      id: prompt.id,
      name: prompt.name.value,
      description: prompt.description?.value ?? undefined,
      template: prompt.template.value,
      version: prompt.version.value,
      isDefault: prompt.isDefault,
      parentId: prompt.parentId ?? undefined,
      createdAt: prompt.createdAt.toISOString(),
      updatedAt: prompt.updatedAt.toISOString(),
    };
  }
}
