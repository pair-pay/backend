import { Module } from '@nestjs/common';
import { DebtsInMemoryRepository } from './repositories/debt-in-memory.repository';
import { DebtsRepository } from 'src/debts/application/ports/debts.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: DebtsRepository,
      useClass: DebtsInMemoryRepository,
    },
  ],
  exports: [DebtsRepository],
})
export class DebtsInMemoryPersistanceModule {}
