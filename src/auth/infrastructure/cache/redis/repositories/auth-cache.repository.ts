import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { AuthRedisCacheMapper } from '../mapper/auth-cache.mapper';
import { AuthCacheRepository } from 'src/auth/application/ports/auth-cache.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';

/**
 * Redis implementation of the TripCacheRepository interface.
 * Handles caching of trip data in Redis.
 */
@Injectable()
export class AuthRedisCacheRepository implements AuthCacheRepository {
  private readonly logger = new Logger(AuthRedisCacheRepository.name);
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
  public async get(cacheKey: string): Promise<Auth | null> {
    this.logger.log(`Getting auth from cache: ${cacheKey}`);
    const auth = await this.redisClient.get(cacheKey);
    if (!auth) return null;
    return AuthRedisCacheMapper.toDomain(JSON.parse(auth));
  }

  /**
   * Stores a trip in the cache
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip to cache
   */
  public async set(cacheKey: string, auth: Auth): Promise<void> {
    this.logger.log(`Setting auth in cache: ${cacheKey}`);
    await this.redisClient.set(cacheKey, JSON.stringify(auth), 'EX', this.ttl);
  }

  /**
   * Removes a cached item
   * @param cacheKey - The key of the item to remove from cache
   */
  public async delete(cacheKey: string): Promise<void> {
    this.logger.log(`Deleting auth from cache: ${cacheKey}`);
    await this.redisClient.del(cacheKey);
  }

  public async clear(): Promise<void> {
    this.logger.log('Clearing auths cache');
    await this.redisClient.flushall();
  }
}
