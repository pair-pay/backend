import { Module } from '@nestjs/common';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { UsersNoopCacheRepository } from './repositories/users-noop-cache.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: UserCacheRepository,
      useClass: UsersNoopCacheRepository,
    },
  ],
  exports: [UserCacheRepository],
})
export class UsersNoopCacheModule {}
