import { Module } from '@nestjs/common';
import { InMemoryPersistanceModule } from './persistance/in-memory/in-memory-persistance.module';
import { MembershipsNoopCacheModule } from './cache/noop/noop-cache.module';
import { MembershipsInMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';
import { TypeOrmPersistanceModule } from './persistance/type-orm/type-orm-persistance.module';
import { MembershipsRedisCacheModule } from './cache/redis/redis-cache.module';

@Module({})
export class MembershipsInfrastructureModule {
  static use(
    databaseDriver: 'in-memory' | 'type-orm',
    cacheDriver: 'in-memory' | 'noop' | 'redis',
  ) {
    const persistenceModule = this.selectPersistenceModule(databaseDriver);
    const cacheModule = this.selectCacheModule(cacheDriver);

    return {
      module: MembershipsInfrastructureModule,
      imports: [persistenceModule, cacheModule],
      exports: [persistenceModule, cacheModule],
    };
  }

  private static selectPersistenceModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return InMemoryPersistanceModule;
      case 'type-orm':
        return TypeOrmPersistanceModule;
      default:
        return InMemoryPersistanceModule;
    }
  }

  private static selectCacheModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return MembershipsInMemoryCacheModule;
      case 'noop':
        return MembershipsNoopCacheModule;
      case 'redis':
        return MembershipsRedisCacheModule;
      default:
        return MembershipsNoopCacheModule;
    }
  }
}
