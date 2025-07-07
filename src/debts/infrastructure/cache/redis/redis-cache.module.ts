import { Module } from '@nestjs/common';
import { DebtsRedisCacheRepository } from './repositories/debt-cache.repository';
import { RedisProvider } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { DebtsCacheRepository } from 'src/debts/application/ports/debts-cache.repository';

@Module({
  imports: [],
  providers: [
    RedisProvider,
    {
      provide: DebtsCacheRepository,
      useClass: DebtsRedisCacheRepository,
    },
  ],
  exports: [DebtsCacheRepository],
})
export class DebtsRedisCacheModule {}
