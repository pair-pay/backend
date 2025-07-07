import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

export abstract class PromptRepository {
  public abstract findAll(): Promise<Prompt[]>;
  public abstract findById(id: string): Promise<Prompt>;
  public abstract findByParentId(parentId: string): Promise<Prompt[]>;
  public abstract create(prompt: Prompt): Promise<Prompt>;
  public abstract update(prompt: Prompt): Promise<Prompt>;
  public abstract delete(id: string): Promise<Prompt>;
}
