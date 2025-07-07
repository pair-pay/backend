import { ExpenseInMemoryCacheEntity } from '../entities/expense-in-memory-cache.entity';
import { ExpenseInMemoryCacheMapper } from '../mapper/expense-in-memory-cache.mapper';
import { Logger } from '@nestjs/common';
import { ExpenseCacheRepository } from 'src/expenses/application/ports/expense-cache.repository';
import { Expense } from 'src/expenses/domain/expense';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { User } from 'src/user/domain/entities/user.entity';

interface CacheEntry {
  data: ExpenseInMemoryCacheEntity | ExpenseInMemoryCacheEntity[];
}

/**
 * In-memory implementation of the TripCacheRepository interface.
 * Handles caching of trip data in memory using a Map.
 */
export class ExpensesInMemoryCacheRepository implements ExpenseCacheRepository {
  private readonly logger = new Logger(ExpensesInMemoryCacheRepository.name);

  private readonly users: Map<string, CacheEntry> = new Map<
    string,
    CacheEntry
  >();

  /**
   * Retrieves a trip from the cache by key
   * @param cacheKey - The key to look up in the cache
   * @returns The cached trip if found, null otherwise
   */
  public async get(cacheKey: string): Promise<Expense | null> {
    const entity = this.users.get(cacheKey);
    if (!entity) {
      return null;
    }
    return ExpenseInMemoryCacheMapper.toDomain(entity.data[0]);
  }

  /**
   * Stores a trip in the cache
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip to cache
   */
  public async set(cacheKey: string, expense: Expense): Promise<void> {
    this.logger.debug('set', JSON.stringify(expense));
    this.users.set(cacheKey, {
      data: ExpenseInMemoryCacheMapper.toPersistence(expense),
    });
  }
  /**
   * Removes a cached item
   * @param cacheKey - The key of the item to remove from cache
   */
  public async delete(cacheKey: string): Promise<void> {
    this.users.delete(cacheKey);
  }

  public async clear(): Promise<void> {
    this.users.clear();
  }
}
