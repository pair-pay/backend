import { Injectable, Logger } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { Group } from 'src/groups/domain/group';

@Injectable()
export class NoopGroupCacheRepository implements GroupCacheRepository {
  private readonly logger = new Logger(NoopGroupCacheRepository.name);
  public async get(key: string): Promise<Group | null> {
    this.logger.debug(`Getting group from cache: ${key}`);
    return null;
  }
  public async set(key: string, value: Group, ttl?: number): Promise<void> {
    this.logger.debug(`Setting group in cache: ${key}`);
  }
  public async delete(key: string): Promise<void> {
    this.logger.debug(`Deleting group from cache: ${key}`);
  }
  public async clear(): Promise<void> {
    this.logger.debug('No-op clear');
  }
}
