import { Module } from '@nestjs/common';
import { GroupCacheRepository } from 'src/groups/application/ports/group-cache.repository';
import { MembershipRedisCacheRepository } from './repositories/membership-cache.repository';
import { MembershipCacheRepository } from 'src/memberships/application/ports/membership-cache.repository';
import { RedisProvider } from 'src/shared/infrastructure/redis/provider/redis.provider';

@Module({
  providers: [
    RedisProvider,
    {
      provide: MembershipCacheRepository,
      useClass: MembershipRedisCacheRepository,
    },
  ],
  exports: [MembershipCacheRepository],
})
export class MembershipsRedisCacheModule {}
