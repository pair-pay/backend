import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { PromptRedisCacheMapper } from '../mapper/prompt-cache.mapper';
import { PromptCacheRepository } from 'src/prompts/application/ports/prompt-cache.repository';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

@Injectable()
export class PromptRedisCacheRepository implements PromptCacheRepository {
  private readonly logger = new Logger(PromptRedisCacheRepository.name);
  private readonly ttl: number;
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
    this.ttl = parseInt(process.env.REDIS_TTL) || 3600;
  }
  public async get(key: string): Promise<Prompt | null> {
    this.logger.log(`Getting prompt from cache: ${key}`);
    const data = await this.redisClient.get(key);
    if (!data) return null;
    return PromptRedisCacheMapper.toDomain(JSON.parse(data));
  }
  public async set(key: string, value: Prompt, ttl?: number): Promise<void> {
    this.logger.log(`Setting prompt in cache: ${key}`);
    const ttlValue = ttl || this.ttl;
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlValue);
  }
  public async delete(key: string): Promise<void> {
    this.logger.log(`Deleting prompt from cache: ${key}`);
    await this.redisClient.del(key);
  }
  public async clear(): Promise<void> {
    this.logger.log('Clearing all cached prompts');
    await this.redisClient.flushdb();
  }
}
