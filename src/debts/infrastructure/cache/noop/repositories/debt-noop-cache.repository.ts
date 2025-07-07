import { Injectable, Logger } from '@nestjs/common';
import { DebtsCacheRepository } from 'src/debts/application/ports/debts-cache.repository';
import { Debt } from 'src/debts/domain/entities/debt';
import { ExpenseCacheRepository } from 'src/expenses/application/ports/expense-cache.repository';
import { Expense } from 'src/expenses/domain/expense';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { User } from 'src/user/domain/entities/user.entity';

/**
 * No-operation implementation of the TripCacheRepository interface.
 * This implementation does not actually cache anything and always returns null.
 * Useful for testing or when caching needs to be disabled.
 */
@Injectable()
export class DebtsNoopCacheRepository implements DebtsCacheRepository {
  private readonly logger = new Logger(DebtsNoopCacheRepository.name);

  /**
   * Simulates retrieving a trip from cache but always returns null
   * @param cacheKey - The key to look up in the cache
   * @returns Always returns null since this is a no-op implementation
   */
  async get(cacheKey: string): Promise<Debt | null> {
    this.logger.debug(`Getting user by cacheKey: ${cacheKey}`);
    return null;
  }

  /**
   * Simulates storing a trip in cache but performs no operation
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip that would be cached
   */
  async set(cacheKey: string, debt: Debt): Promise<void> {
    this.logger.debug(`Setting debt: ${debt}`);
  }

  /**
   * Simulates retrieving cached search results but always returns null
   * @param cacheKey - The key to look up the search results
   * @returns Always returns null since this is a no-op implementation
   */
  async getSearchQuery(cacheKey: string): Promise<Expense[] | null> {
    this.logger.debug(`Getting expenses by cacheKey: ${cacheKey}`);
    return null;
  }

  /**
   * Simulates removing a cached item but performs no operation
   * @param cacheKey - The key of the item that would be removed from cache
   */
  async delete(cacheKey: string): Promise<void> {
    this.logger.debug(`Deleting expense with cacheKey: ${cacheKey}`);
  }

  async clear(): Promise<void> {
    this.logger.debug('Clearing expenses cache');
  }
}
