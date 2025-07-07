import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { DebtRedisCacheMapper } from '../mapper/debt-cache.mapper';
import { DebtsCacheRepository } from 'src/debts/application/ports/debts-cache.repository';
import { Debt } from 'src/debts/domain/entities/debt';

/**
 * Redis implementation of the TripCacheRepository interface.
 * Handles caching of trip data in Redis.
 */
@Injectable()
export class DebtsRedisCacheRepository implements DebtsCacheRepository {
  private readonly logger = new Logger(DebtsRedisCacheRepository.name);
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
  public async get(cacheKey: string): Promise<Debt | null> {
    this.logger.log(`Getting debt from cache: ${cacheKey}`);
    const debt = await this.redisClient.get(cacheKey);
    if (!debt) return null;
    return DebtRedisCacheMapper.toDomain(JSON.parse(debt));
  }

  /**
   * Stores a trip in the cache
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip to cache
   */
  public async set(cacheKey: string, debt: Debt): Promise<void> {
    this.logger.log(`Setting debt in cache: ${cacheKey}`);
    await this.redisClient.set(cacheKey, JSON.stringify(debt), 'EX', this.ttl);
  }

  /**
   * Removes a cached item
   * @param cacheKey - The key of the item to remove from cache
   */
  public async delete(cacheKey: string): Promise<void> {
    this.logger.log(`Deleting debt from cache: ${cacheKey}`);
    await this.redisClient.del(cacheKey);
  }

  public async clear(): Promise<void> {
    this.logger.log('Clearing debts cache');
    await this.redisClient.flushall();
  }
}
