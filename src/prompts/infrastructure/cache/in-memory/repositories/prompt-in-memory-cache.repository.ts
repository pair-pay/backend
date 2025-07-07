import { Injectable, Logger } from '@nestjs/common';
import { PromptInMemoryCacheEntity } from '../entities/prompt-in-memory-cache.entity';
import { PromptInMemoryCacheMapper } from '../mapper/prompt-in-memory-cache.mapper';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';
import { PromptCacheRepository } from 'src/prompts/application/ports/prompt-cache.repository';

@Injectable()
export class PromptInMemoryCacheRepository implements PromptCacheRepository {
  private readonly logger = new Logger(PromptInMemoryCacheRepository.name);

  private cache: Map<string, { data: PromptInMemoryCacheEntity; ttl: number }> =
    new Map();

  public async get(key: string): Promise<Prompt | null> {
    this.logger.log(`Getting prompt from cache: ${key}`);
    const cached = this.cache.get(key);
    if (!cached) return null;
    if (Date.now() > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    return PromptInMemoryCacheMapper.toDomain(cached.data);
  }
  public async set(key: string, value: Prompt, ttl?: number): Promise<void> {
    this.logger.log(`Setting prompt in cache: ${key}`);
    const ttlValue = ttl || 3600;
    const ttlMs = Date.now() + ttlValue * 1000;
    const entity = PromptInMemoryCacheMapper.toPersistence(value);
    this.cache.set(key, { data: entity, ttl: ttlMs });
  }

  public async delete(key: string): Promise<void> {
    this.logger.log(`Deleting prompt from cache: ${key}`);
    this.cache.delete(key);
  }
  public async clear(): Promise<void> {
    this.logger.log('Clearing all cached prompts');
    this.cache.clear();
  }
}
