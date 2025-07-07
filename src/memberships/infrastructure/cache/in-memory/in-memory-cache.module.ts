import { Module } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { MembershipInMemoryCacheRepository } from './repositories/membership-in-memory-cache.repository';
import { MembershipCacheRepository } from 'src/memberships/application/ports/membership-cache.repository';

@Module({
  providers: [
    {
      provide: MembershipCacheRepository,
      useClass: MembershipInMemoryCacheRepository,
    },
  ],
  exports: [MembershipCacheRepository],
})
export class MembershipsInMemoryCacheModule {}
