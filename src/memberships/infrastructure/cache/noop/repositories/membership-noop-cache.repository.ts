import { Injectable, Logger } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { Group } from 'src/groups/domain/group';
import { MembershipCacheRepository } from 'src/memberships/application/ports/membership-cache.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

@Injectable()
export class NoopMembershipCacheRepository
  implements MembershipCacheRepository
{
  private readonly logger = new Logger(NoopMembershipCacheRepository.name);
  public async get(key: string): Promise<Membership | null> {
    this.logger.debug(`Getting membership from cache: ${key}`);
    return null;
  }
  public async set(
    key: string,
    value: Membership,
    ttl?: number,
  ): Promise<void> {
    this.logger.debug(`Setting membership in cache: ${key}`);
  }
  public async delete(key: string): Promise<void> {
    this.logger.debug(`Deleting membership from cache: ${key}`);
  }
  public async clear(): Promise<void> {
    this.logger.debug('No-op clear');
  }
}
