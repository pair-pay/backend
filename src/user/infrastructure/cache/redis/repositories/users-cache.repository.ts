import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { UserRedisCacheMapper } from '../mapper/users-cache.mapper';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { User } from 'src/user/domain/entities/user.entity';

/**
 * Redis implementation of the TripCacheRepository interface.
 * Handles caching of trip data in Redis.
 */
@Injectable()
export class UsersRedisCacheRepository implements UserCacheRepository {
  private readonly logger = new Logger(UsersRedisCacheRepository.name);
  private readonly ttl: number;

  /**
   * Creates an instance of TripRedisCacheRepository.
   * @param redisClient - The Redis client instance for database operations
   */
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
    this.ttl = parseInt(process.env.REDIS_TTL) || 3600;
  }

  /**
   * Retrieves a trip or array of trips from the cache by key
   * @param cacheKey - The key to look up in the cache
   * @returns The cached trip(s) if found, null otherwise
   */
  public async get(cacheKey: string): Promise<User | null> {
    this.logger.log(`Getting user from cache: ${cacheKey}`);
    const user = await this.redisClient.get(cacheKey);
    if (!user) return null;
    return UserRedisCacheMapper.toDomain(JSON.parse(user));
  }

  /**
   * Stores a trip in the cache
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip to cache
   */
  public async set(cacheKey: string, user: User): Promise<void> {
    this.logger.log(`Setting user in cache: ${cacheKey}`);
    await this.redisClient.set(cacheKey, JSON.stringify(user), 'EX', this.ttl);
  }

  /**
   * Removes a cached item
   * @param cacheKey - The key of the item to remove from cache
   */
  public async delete(cacheKey: string): Promise<void> {
    this.logger.log(`Deleting user from cache: ${cacheKey}`);
    await this.redisClient.del(cacheKey);
  }

  public async clear(): Promise<void> {
    this.logger.log('Clearing users cache');
    await this.redisClient.flushall();
  }
}
