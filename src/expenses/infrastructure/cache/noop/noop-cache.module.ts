import { Module } from '@nestjs/common';
import { UserCacheRepository } from 'src/user/application/ports/user-cache.repository';
import { ExpensesNoopCacheRepository } from './repositories/expense-noop-cache.repository';
import { ExpenseCacheRepository } from 'src/expenses/application/ports/expense-cache.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: ExpenseCacheRepository,
      useClass: ExpensesNoopCacheRepository,
    },
  ],
  exports: [ExpenseCacheRepository],
})
export class ExpensesNoopCacheModule {}
