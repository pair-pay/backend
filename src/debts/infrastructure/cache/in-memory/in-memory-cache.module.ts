import { Module } from '@nestjs/common';
import { DebtsCacheRepository } from 'src/debts/application/ports/debts-cache.repository';
import { DebtsInMemoryCacheRepository } from './repositories/debt-in-memory-cache.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: DebtsCacheRepository,
      useClass: DebtsInMemoryCacheRepository,
    },
  ],
  exports: [DebtsCacheRepository],
})
export class DebtsInMemoryCacheModule {}
