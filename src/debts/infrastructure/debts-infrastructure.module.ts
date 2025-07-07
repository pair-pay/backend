import { Module } from '@nestjs/common';
import { AuthInfrastructureModule } from 'src/auth/infrastructure/auth-infrastructure.module';
import { DebtsInMemoryPersistanceModule } from './persistance/in-memory/in-memory-persistance.module';
import { DebtsInMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';
import { DebtsTypeOrmPersistanceModule } from './persistance/type-orm/type-orm-persistance.module';
import { DebtsRedisCacheModule } from './cache/redis/redis-cache.module';
import { DebtsNoopCacheModule } from './cache/noop/noop-cache.module';

@Module({})
export class DebtsInfrastructureModule {
  static use(
    databaseDriver: 'in-memory' | 'type-orm',
    cacheDriver: 'in-memory' | 'noop' | 'redis',
  ) {
    const persistenceModule = this.selectPersistenceModule(databaseDriver);
    const cacheModule = this.selectCacheModule(cacheDriver);

    return {
      module: DebtsInfrastructureModule,
      imports: [persistenceModule, cacheModule],
      exports: [persistenceModule, cacheModule],
    };
  }

  private static selectPersistenceModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return DebtsInMemoryPersistanceModule;
      case 'type-orm':
        return DebtsTypeOrmPersistanceModule;
      default:
        return DebtsInMemoryPersistanceModule;
    }
  }

  private static selectCacheModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return DebtsInMemoryCacheModule;
      case 'noop':
        return DebtsNoopCacheModule;
      case 'redis':
        return DebtsRedisCacheModule;
      default:
        return DebtsNoopCacheModule;
    }
  }
}
