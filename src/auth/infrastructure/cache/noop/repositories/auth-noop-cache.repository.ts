import { Injectable, Logger } from '@nestjs/common';
import { AuthCacheRepository } from 'src/auth/application/ports/auth-cache.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';

/**
 * No-operation implementation of the TripCacheRepository interface.
 * This implementation does not actually cache anything and always returns null.
 * Useful for testing or when caching needs to be disabled.
 */
@Injectable()
export class AuthNoopCacheRepository implements AuthCacheRepository {
  private readonly logger = new Logger(AuthNoopCacheRepository.name);

  /**
   * Simulates retrieving a trip from cache but always returns null
   * @param cacheKey - The key to look up in the cache
   * @returns Always returns null since this is a no-op implementation
   */
  async get(cacheKey: string): Promise<Auth | null> {
    this.logger.debug(`Getting user by cacheKey: ${cacheKey}`);
    return null;
  }

  /**
   * Simulates storing a trip in cache but performs no operation
   * @param cacheKey - The key to store the trip under
   * @param trip - The trip that would be cached
   */
  async set(cacheKey: string, auth: Auth): Promise<void> {
    this.logger.debug(`Setting auth: ${auth}`);
  }

  /**
   * Simulates retrieving cached search results but always returns null
   * @param cacheKey - The key to look up the search results
   * @returns Always returns null since this is a no-op implementation
   */
  async getSearchQuery(cacheKey: string): Promise<Auth[] | null> {
    this.logger.debug(`Getting auths by cacheKey: ${cacheKey}`);
    return null;
  }

  /**
   * Simulates removing a cached item but performs no operation
   * @param cacheKey - The key of the item that would be removed from cache
   */
  async delete(cacheKey: string): Promise<void> {
    this.logger.debug(`Deleting auth with cacheKey: ${cacheKey}`);
  }

  async clear(): Promise<void> {
    this.logger.debug('Clearing auths cache');
  }
}
