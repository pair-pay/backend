import { Module } from '@nestjs/common';
import { UsersInMemoryPersistanceModule } from './persistance/in-memory/in-memory-persistance.module';
import { UsersNoopCacheModule } from './cache/noop/noop-cache.module';
import { UsersInMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';
import { UsersTypeOrmPersistanceModule } from './persistance/type-orm/type-orm-persistance.module';
import { UsersRedisCacheModule } from './cache/redis/redis-cache.module';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

@Module({})
export class UsersInfrastructureModule {
  static use(
    databaseDriver: 'in-memory' | 'type-orm',
    cacheDriver: 'in-memory' | 'noop' | 'redis',
  ) {
    const persistenceModule = this.selectPersistenceModule(databaseDriver);
    const cacheModule = this.selectCacheModule(cacheDriver);

    return {
      module: UsersInfrastructureModule,
      imports: [persistenceModule, cacheModule],
      exports: [persistenceModule, cacheModule],
    };
  }

  private static selectPersistenceModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return UsersInMemoryPersistanceModule;
      case 'type-orm':
        return UsersTypeOrmPersistanceModule;
      default:
        return UsersInMemoryPersistanceModule;
    }
  }

  private static selectCacheModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return UsersInMemoryCacheModule;
      case 'noop':
        return UsersNoopCacheModule;
      case 'redis':
        return UsersRedisCacheModule;
      default:
        return UsersNoopCacheModule;
    }
  }
}
