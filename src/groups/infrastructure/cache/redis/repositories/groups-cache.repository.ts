import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { Group } from 'src/groups/domain/group';
import { GroupsRedisCacheMapper } from '../mapper/groups-cache.mapper';

@Injectable()
export class GroupsRedisCacheRepository implements GroupCacheRepository {
  private readonly logger = new Logger(GroupsRedisCacheRepository.name);
  private readonly ttl: number;
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
    this.ttl = parseInt(process.env.REDIS_TTL) || 3600;
  }
  public async get(key: string): Promise<Group | null> {
    this.logger.log(`Getting group from cache: ${key}`);
    const data = await this.redisClient.get(key);
    if (!data) return null;
    return GroupsRedisCacheMapper.toDomain(JSON.parse(data));
  }
  public async set(key: string, value: Group, ttl?: number): Promise<void> {
    this.logger.log(`Setting group in cache: ${key}`);
    const ttlValue = ttl || this.ttl;
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlValue);
  }
  public async delete(key: string): Promise<void> {
    this.logger.log(`Deleting group from cache: ${key}`);
    await this.redisClient.del(key);
  }
  public async clear(): Promise<void> {
    this.logger.log('Clearing all cached groups');
    await this.redisClient.flushdb();
  }
}
