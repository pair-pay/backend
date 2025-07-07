import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { MembershipRedisCacheMapper } from '../mapper/membership-cache.mapper';
import { MembershipCacheRepository } from 'src/memberships/application/ports/membership-cache.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

@Injectable()
export class MembershipRedisCacheRepository
  implements MembershipCacheRepository
{
  private readonly logger = new Logger(MembershipRedisCacheRepository.name);
  private readonly ttl: number;
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
    this.ttl = parseInt(process.env.REDIS_TTL) || 3600;
  }
  public async get(key: string): Promise<Membership | null> {
    this.logger.log(`Getting membership from cache: ${key}`);
    const data = await this.redisClient.get(key);
    if (!data) return null;
    return MembershipRedisCacheMapper.toDomain(JSON.parse(data));
  }
  public async set(
    key: string,
    value: Membership,
    ttl?: number,
  ): Promise<void> {
    this.logger.log(`Setting membership in cache: ${key}`);
    const ttlValue = ttl || this.ttl;
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlValue);
  }
  public async delete(key: string): Promise<void> {
    this.logger.log(`Deleting membership from cache: ${key}`);
    await this.redisClient.del(key);
  }
  public async clear(): Promise<void> {
    this.logger.log('Clearing all cached memberships');
    await this.redisClient.flushdb();
  }
}
