import { Module } from '@nestjs/common';
import { AuthInMemoryCacheRepository } from './repositories/debt-in-memory-cache.repository';
import { AuthCacheRepository } from 'src/auth/application/ports/auth-cache.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AuthCacheRepository,
      useClass: AuthInMemoryCacheRepository,
    },
  ],
  exports: [AuthCacheRepository],
})
export class AuthInMemoryCacheModule {}
