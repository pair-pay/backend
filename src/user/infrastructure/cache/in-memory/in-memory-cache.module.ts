import { Module } from '@nestjs/common';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { UsersInMemoryCacheRepository } from './repositories/users-in-memory-cache.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: UserCacheRepository,
      useClass: UsersInMemoryCacheRepository,
    },
  ],
  exports: [UserCacheRepository],
})
export class UsersInMemoryCacheModule {}
