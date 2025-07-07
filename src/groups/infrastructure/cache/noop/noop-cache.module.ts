import { Module } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { NoopGroupCacheRepository } from './repositories/groups-noop-cache.repository';

@Module({
  providers: [
    {
      provide: GroupCacheRepository,
      useClass: NoopGroupCacheRepository,
    },
  ],
  exports: [GroupCacheRepository],
})
export class GroupsNoopCacheModule {}
