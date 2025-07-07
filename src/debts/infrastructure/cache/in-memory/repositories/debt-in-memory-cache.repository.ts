import { DebtsCacheRepository } from 'src/debts/application/ports/debts-cache.repository';
import { DebtInMemoryCacheEntity } from '../entities/debt-in-memory-cache.entity';
import { DebtInMemoryCacheMapper } from '../mapper/debt-in-memory-cache.mapper';
import { Logger } from '@nestjs/common';
import { Debt } from 'src/debts/domain/entities/debt';

interface CacheEntry {
  data: DebtInMemoryCacheEntity | DebtInMemoryCacheEntity[];
}

/**
 * In-memory implementation of the TripCacheRepository interface.
 * Handles caching of trip data in memory using a Map.
 */
export class DebtsInMemoryCacheRepository implements DebtsCacheRepository {
  private readonly logger = new Logger(DebtsInMemoryCacheRepository.name);

  private readonly debts: Map<string, CacheEntry> = new Map<
    string,
    CacheEntry
  >();

  /**
   * Retrieves a trip from the cache by key
   * @param cacheKey - The key to look up in the cache
   * @returns The cached trip if found, null otherwise
   */
  public async get(cacheKey: string): Promise<Debt | null> {
    const entity = this.debts.get(cacheKey);
    if (!entity) {
      return null;
    }
    return entity.data[0];
  }

  /**
   * Stores a trip in the cache
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip to cache
   */
  public async set(cacheKey: string, debt: Debt): Promise<void> {
    this.logger.debug('set', JSON.stringify(debt));
    this.debts.set(cacheKey, {
      data: DebtInMemoryCacheMapper.toPersistence(debt),
    });
  }
  /**
   * Removes a cached item
   * @param cacheKey - The key of the item to remove from cache
   */
  public async delete(cacheKey: string): Promise<void> {
    this.debts.delete(cacheKey);
  }

  public async clear(): Promise<void> {
    this.debts.clear();
  }
}
