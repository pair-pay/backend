import { Module } from '@nestjs/common';
import { ExpensesInMemoryPersistanceModule } from './persistance/in-memory/in-memory-persistance.module';
import { ExpensesInMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';
import { ExpensesTypeOrmPersistanceModule } from './persistance/type-orm/type-orm-persistance.module';
import { ExpensesRedisCacheModule } from './cache/redis/redis-cache.module';
import { ExpensesNoopCacheModule } from './cache/noop/noop-cache.module';

@Module({})
export class ExpensesInfrastructureModule {
  static use(
    databaseDriver: 'in-memory' | 'type-orm',
    cacheDriver: 'in-memory' | 'noop' | 'redis',
  ) {
    const persistenceModule = this.selectPersistenceModule(databaseDriver);
    const cacheModule = this.selectCacheModule(cacheDriver);

    return {
      module: ExpensesInfrastructureModule,
      imports: [persistenceModule, cacheModule],
      exports: [persistenceModule, cacheModule],
    };
  }

  private static selectPersistenceModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return ExpensesInMemoryPersistanceModule;
      case 'type-orm':
        return ExpensesTypeOrmPersistanceModule;
      default:
        return ExpensesInMemoryPersistanceModule;
    }
  }

  private static selectCacheModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return ExpensesInMemoryCacheModule;
      case 'noop':
        return ExpensesNoopCacheModule;
      case 'redis':
        return ExpensesRedisCacheModule;
      default:
        return ExpensesNoopCacheModule;
    }
  }
}
