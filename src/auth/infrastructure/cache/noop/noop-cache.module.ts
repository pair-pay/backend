import { Module } from '@nestjs/common';
import { AuthNoopCacheRepository } from './repositories/auth-noop-cache.repository';
import { AuthCacheRepository } from 'src/auth/application/ports/auth-cache.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AuthCacheRepository,
      useClass: AuthNoopCacheRepository,
    },
  ],
  exports: [AuthCacheRepository],
})
export class AuthNoopCacheModule {}
