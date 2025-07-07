import { Injectable, Logger } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { Group } from 'src/groups/domain/group';
import { MembershipInMemoryCacheEntity } from '../entities/membership-in-memory-cache.entity';
import { MembershipCacheRepository } from 'src/memberships/application/ports/membership-cache.repository';
import { MembershipInMemoryCacheMapper } from '../mapper/membership-in-memory-cache.mapper';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

@Injectable()
export class MembershipInMemoryCacheRepository
  implements MembershipCacheRepository
{
  private readonly logger = new Logger(MembershipInMemoryCacheRepository.name);

  private cache: Map<
    string,
    { data: MembershipInMemoryCacheEntity; ttl: number }
  > = new Map();

  public async get(key: string): Promise<Membership | null> {
    this.logger.log(`Getting membership from cache: ${key}`);
    const cached = this.cache.get(key);
    if (!cached) return null;
    if (Date.now() > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    return MembershipInMemoryCacheMapper.toDomain(cached.data);
  }
  public async set(
    key: string,
    value: Membership,
    ttl?: number,
  ): Promise<void> {
    this.logger.log(`Setting membership in cache: ${key}`);
    const ttlValue = ttl || 3600;
    const ttlMs = Date.now() + ttlValue * 1000;
    const entity = MembershipInMemoryCacheMapper.toPersistence(value);
    this.cache.set(key, { data: entity, ttl: ttlMs });
  }

  public async delete(key: string): Promise<void> {
    this.logger.log(`Deleting membership from cache: ${key}`);
    this.cache.delete(key);
  }
  public async clear(): Promise<void> {
    this.logger.log('Clearing all cached memberships');
    this.cache.clear();
  }
}
