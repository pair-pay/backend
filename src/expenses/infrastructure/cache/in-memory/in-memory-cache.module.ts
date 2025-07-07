import { Module } from '@nestjs/common';
import { ExpenseCacheRepository } from 'src/expenses/application/ports/expense-cache.repository';
import { ExpensesInMemoryCacheRepository } from './repositories/expense-in-memory-cache.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: ExpenseCacheRepository,
      useClass: ExpensesInMemoryCacheRepository,
    },
  ],
  exports: [ExpenseCacheRepository],
})
export class ExpensesInMemoryCacheModule {}
