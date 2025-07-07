import { Module } from '@nestjs/common';
import { GroupRepository } from 'src/groups/application/ports/group.repository';
import { GroupInMemoryRepository } from './repositories/groups-in-memory.repository';

@Module({
  providers: [
    {
      provide: GroupRepository,
      useClass: GroupInMemoryRepository,
    },
  ],
  exports: [GroupRepository],
})
export class InMemoryPersistanceModule {}
