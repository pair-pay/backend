import { Module } from '@nestjs/common';
import { AuthInMemoryRepository } from './repositories/auth-in-memory.repository';
import { AuthRepository } from 'src/auth/application/ports/auth.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthInMemoryRepository,
    },
  ],
  exports: [AuthRepository],
})
export class AuthInMemoryPersistanceModule {}
