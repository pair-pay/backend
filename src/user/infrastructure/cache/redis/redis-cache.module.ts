import { Module } from '@nestjs/common';
import { UsersRedisCacheRepository } from './repositories/users-cache.repository';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { RedisProvider } from 'src/shared/infrastructure/redis/provider/redis.provider';

@Module({
  imports: [],
  providers: [
    RedisProvider,
    {
      provide: UserCacheRepository,
      useClass: UsersRedisCacheRepository,
    },
  ],
  exports: [UserCacheRepository],
})
export class UsersRedisCacheModule {}
