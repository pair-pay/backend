import { AuthCacheRepository } from 'src/auth/application/ports/auth-cache.repository';
import { AuthInMemoryCacheEntity } from '../entities/auth-in-memory-cache.entity';
import { AuthInMemoryCacheMapper } from '../mapper/auth-in-memory-cache.mapper';
import { Logger } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entities/auth.entity';

interface CacheEntry {
  data: AuthInMemoryCacheEntity | AuthInMemoryCacheEntity[];
}

/**
 * In-memory implementation of the TripCacheRepository interface.
 * Handles caching of trip data in memory using a Map.
 */
export class AuthInMemoryCacheRepository implements AuthCacheRepository {
  private readonly logger = new Logger(AuthInMemoryCacheRepository.name);

  private readonly auths: Map<string, CacheEntry> = new Map<
    string,
    CacheEntry
  >();

  /**
   * Retrieves a trip from the cache by key
   * @param cacheKey - The key to look up in the cache
   * @returns The cached trip if found, null otherwise
   */
  public async get(cacheKey: string): Promise<Auth | null> {
    const entity = this.auths.get(cacheKey);
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
  public async set(cacheKey: string, auth: Auth): Promise<void> {
    this.logger.debug('set', JSON.stringify(auth));
    this.auths.set(cacheKey, {
      data: AuthInMemoryCacheMapper.toPersistence(auth),
    });
  }
  /**
   * Removes a cached item
   * @param cacheKey - The key of the item to remove from cache
   */
  public async delete(cacheKey: string): Promise<void> {
    this.auths.delete(cacheKey);
  }

  public async clear(): Promise<void> {
    this.auths.clear();
  }
}
