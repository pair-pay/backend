import { Module } from '@nestjs/common';
import { UsersInMemoryRepository } from './repositories/users-in-memory.repository';
import { UserRepository } from 'src/user/application/ports/user.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersInMemoryRepository,
    },
  ],
  exports: [UserRepository],
})
export class UsersInMemoryPersistanceModule {}
