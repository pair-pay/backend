import { Module } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { GroupsRedisCacheRepository } from './repositories/groups-cache.repository';
import { RedisProvider } from 'src/shared/infrastructure/redis/provider/redis.provider';

@Module({
  providers: [
    RedisProvider,
    {
      provide: GroupCacheRepository,
      useClass: GroupsRedisCacheRepository,
    },
  ],
  exports: [GroupCacheRepository],
})
export class GroupsRedisCacheModule {}
