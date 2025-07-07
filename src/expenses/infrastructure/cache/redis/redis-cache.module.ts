import { Module } from '@nestjs/common';
import { ExpensesRedisCacheRepository } from './repositories/expense-cache.repository';
import { RedisProvider } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { ExpenseCacheRepository } from 'src/expenses/application/ports/expense-cache.repository';

@Module({
  imports: [],
  providers: [
    RedisProvider,
    {
      provide: ExpenseCacheRepository,
      useClass: ExpensesRedisCacheRepository,
    },
  ],
  exports: [ExpenseCacheRepository],
})
export class ExpensesRedisCacheModule {}
