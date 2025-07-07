import { UserInMemoryCacheEntity } from '../entities/user-in-memory-cache.entity';
import { UserInMemoryCacheMapper } from '../mapper/users-in-memory-cache.mapper';
import { Logger } from '@nestjs/common';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { User } from 'src/user/domain/entities/user.entity';

interface CacheEntry {
  data: UserInMemoryCacheEntity | UserInMemoryCacheEntity[];
}

/**
 * In-memory implementation of the TripCacheRepository interface.
 * Handles caching of trip data in memory using a Map.
 */
export class UsersInMemoryCacheRepository implements UserCacheRepository {
  private readonly logger = new Logger(UsersInMemoryCacheRepository.name);

  private readonly users: Map<string, CacheEntry> = new Map<
    string,
    CacheEntry
  >();

  /**
   * Retrieves a trip from the cache by key
   * @param cacheKey - The key to look up in the cache
   * @returns The cached trip if found, null otherwise
   */
  public async get(cacheKey: string): Promise<User | null> {
    const entity = this.users.get(cacheKey);
    if (!entity) {
      return null;
    }
    return UserInMemoryCacheMapper.toDomain(entity.data[0]);
  }

  /**
   * Stores a trip in the cache
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip to cache
   */
  public async set(cacheKey: string, user: User): Promise<void> {
    this.logger.debug('set', JSON.stringify(user));
    this.users.set(cacheKey, {
      data: UserInMemoryCacheMapper.toPersistence(user),
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
