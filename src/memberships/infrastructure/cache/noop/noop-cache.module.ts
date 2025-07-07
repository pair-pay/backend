import { Module } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { NoopMembershipCacheRepository } from './repositories/membership-noop-cache.repository';
import { MembershipCacheRepository } from 'src/memberships/application/ports/membership-cache.repository';

@Module({
  providers: [
    {
      provide: MembershipCacheRepository,
      useClass: NoopMembershipCacheRepository,
    },
  ],
  exports: [MembershipCacheRepository],
})
export class MembershipsNoopCacheModule {}
