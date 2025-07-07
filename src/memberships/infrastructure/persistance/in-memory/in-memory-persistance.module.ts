import { Module } from '@nestjs/common';
import { MembershipInMemoryRepository } from './repositories/membership-in-memory.repository';
import { MembershipRepository } from 'src/memberships/application/ports/membership.repository';

@Module({
  providers: [
    {
      provide: MembershipRepository,
      useClass: MembershipInMemoryRepository,
    },
  ],
  exports: [MembershipRepository],
})
export class InMemoryPersistanceModule {}
