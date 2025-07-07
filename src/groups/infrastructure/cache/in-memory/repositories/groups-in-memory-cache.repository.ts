import { Injectable, Logger } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { Group } from 'src/groups/domain/group';
import { InMemoryGroupsCacheMapper } from '../mapper/groups-in-memory-cache.mapper';
import { GroupsInMemoryCacheEntity } from '../entities/groups-in-memory-cache.entity';

@Injectable()
export class InMemoryGroupCacheRepository implements GroupCacheRepository {
  private readonly logger = new Logger(InMemoryGroupCacheRepository.name);
  private cache: Map<string, { data: GroupsInMemoryCacheEntity; ttl: number }> =
    new Map();
  public async get(key: string): Promise<Group | null> {
    this.logger.log(`Getting group from cache: ${key}`);
    const cached = this.cache.get(key);
    if (!cached) return null;
    if (Date.now() > cached.ttl) {
      this.cache.delete(key);
      return null;
    }
    return InMemoryGroupsCacheMapper.toDomain(cached.data);
  }
  public async set(key: string, value: Group, ttl?: number): Promise<void> {
    this.logger.log(`Setting group in cache: ${key}`);
    const ttlValue = ttl || 3600;
    const ttlMs = Date.now() + ttlValue * 1000;
    const entity = InMemoryGroupsCacheMapper.toPersistence(value);
    this.cache.set(key, { data: entity, ttl: ttlMs });
  }
  public async delete(key: string): Promise<void> {
    this.logger.log(`Deleting group from cache: ${key}`);
    this.cache.delete(key);
  }
  public async clear(): Promise<void> {
    this.logger.log('Clearing all cached groups');
    this.cache.clear();
  }
}
