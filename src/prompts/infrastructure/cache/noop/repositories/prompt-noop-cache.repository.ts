import { Injectable, Logger } from '@nestjs/common';
import { PromptCacheRepository } from 'src/prompts/application/ports/prompt-cache.repository';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

@Injectable()
export class NoopPromptCacheRepository implements PromptCacheRepository {
  private readonly logger = new Logger(NoopPromptCacheRepository.name);
  public async get(key: string): Promise<Prompt | null> {
    this.logger.debug(`Getting prompt from cache: ${key}`);
    return null;
  }
  public async set(key: string, value: Prompt, ttl?: number): Promise<void> {
    this.logger.debug(`Setting prompt in cache: ${key}`);
  }
  public async delete(key: string): Promise<void> {
    this.logger.debug(`Deleting prompt from cache: ${key}`);
  }
  public async clear(): Promise<void> {
    this.logger.debug('No-op clear');
  }
}
