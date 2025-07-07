import { Module } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { InMemoryGroupCacheRepository } from './repositories/groups-in-memory-cache.repository';

@Module({
  providers: [
    {
      provide: GroupCacheRepository,
      useClass: InMemoryGroupCacheRepository,
    },
  ],
  exports: [GroupCacheRepository],
})
export class GroupsInMemoryCacheModule {}
