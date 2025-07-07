import { Module } from '@nestjs/common';
import { AuthRedisCacheRepository } from './repositories/auth-cache.repository';
import { RedisProvider } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { AuthCacheRepository } from 'src/auth/application/ports/auth-cache.repository';

@Module({
  imports: [],
  providers: [
    RedisProvider,
    {
      provide: AuthCacheRepository,
      useClass: AuthRedisCacheRepository,
    },
  ],
  exports: [AuthCacheRepository],
})
export class AuthRedisCacheModule {}
