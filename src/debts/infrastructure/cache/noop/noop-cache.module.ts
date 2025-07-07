import { Module } from '@nestjs/common';
import { DebtsNoopCacheRepository } from './repositories/debt-noop-cache.repository';
import { DebtsCacheRepository } from 'src/debts/application/ports/debts-cache.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: DebtsCacheRepository,
      useClass: DebtsNoopCacheRepository,
    },
  ],
  exports: [DebtsCacheRepository],
})
export class DebtsNoopCacheModule {}
