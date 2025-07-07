import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { User } from 'src/user/domain/entities/user.entity';
import { ExpenseCacheRepository } from 'src/expenses/application/ports/expense-cache.repository';
import { Expense } from 'src/expenses/domain/expense';
import { ExpenseRedisCacheMapper } from '../mapper/expense-cache.mapper';

/**
 * Redis implementation of the TripCacheRepository interface.
 * Handles caching of trip data in Redis.
 */
@Injectable()
export class ExpensesRedisCacheRepository implements ExpenseCacheRepository {
  private readonly logger = new Logger(ExpensesRedisCacheRepository.name);
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
  public async get(cacheKey: string): Promise<Expense | null> {
    this.logger.log(`Getting expense from cache: ${cacheKey}`);
    const expense = await this.redisClient.get(cacheKey);
    if (!expense) return null;
    return ExpenseRedisCacheMapper.toDomain(JSON.parse(expense));
  }

  /**
   * Stores a trip in the cache
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip to cache
   */
  public async set(cacheKey: string, expense: Expense): Promise<void> {
    this.logger.log(`Setting expense in cache: ${cacheKey}`);
    await this.redisClient.set(
      cacheKey,
      JSON.stringify(ExpenseRedisCacheMapper.toPersistence(expense)),
      'EX',
      this.ttl,
    );
  }

  /**
   * Removes a cached item
   * @param cacheKey - The key of the item to remove from cache
   */
  public async delete(cacheKey: string): Promise<void> {
    this.logger.log(`Deleting expense from cache: ${cacheKey}`);
    await this.redisClient.del(cacheKey);
  }

  public async clear(): Promise<void> {
    this.logger.log('Clearing expenses cache');
    await this.redisClient.flushall();
  }
}
