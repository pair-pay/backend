import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

export abstract class PromptCacheRepository {
  public abstract get(key: string): Promise<Prompt | null>;
  public abstract set(key: string, value: Prompt, ttl?: number): Promise<void>;
  public abstract delete(key: string): Promise<void>;
  public abstract clear(): Promise<void>;
}
