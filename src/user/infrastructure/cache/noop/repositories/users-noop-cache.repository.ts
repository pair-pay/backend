import { Injectable, Logger } from '@nestjs/common';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { User } from 'src/user/domain/entities/user.entity';

/**
 * No-operation implementation of the TripCacheRepository interface.
 * This implementation does not actually cache anything and always returns null.
 * Useful for testing or when caching needs to be disabled.
 */
@Injectable()
export class UsersNoopCacheRepository implements UserCacheRepository {
  private readonly logger = new Logger(UsersNoopCacheRepository.name);

  /**
   * Simulates retrieving a trip from cache but always returns null
   * @param cacheKey - The key to look up in the cache
   * @returns Always returns null since this is a no-op implementation
   */
  async get(cacheKey: string): Promise<User | null> {
    this.logger.debug(`Getting user by cacheKey: ${cacheKey}`);
    return null;
  }

  /**
   * Simulates storing a trip in cache but performs no operation
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip that would be cached
   */
  async set(cacheKey: string, user: User): Promise<void> {
    this.logger.debug(`Setting user: ${user}`);
  }

  /**
   * Simulates retrieving cached search results but always returns null
   * @param cacheKey - The key to look up the search results
   * @returns Always returns null since this is a no-op implementation
   */
  async getSearchQuery(cacheKey: string): Promise<User[] | null> {
    this.logger.debug(`Getting users by cacheKey: ${cacheKey}`);
    return null;
  }

  /**
   * Simulates removing a cached item but performs no operation
   * @param cacheKey - The key of the item that would be removed from cache
   */
  async delete(cacheKey: string): Promise<void> {
    this.logger.debug(`Deleting user with cacheKey: ${cacheKey}`);
  }

  async clear(): Promise<void> {
    this.logger.debug('Clearing users cache');
  }
}
