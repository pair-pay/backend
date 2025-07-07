import { Module } from '@nestjs/common';
import { InMemoryPersistanceModule } from './persistance/in-memory/in-memory-persistance.module';
import { GroupsNoopCacheModule } from './cache/noop/noop-cache.module';
import { GroupsInMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';
import { TypeOrmPersistanceModule } from './persistance/type-orm/type-orm-persistance.module';
import { GroupsRedisCacheModule } from './cache/redis/redis-cache.module';
import { GroupRepository } from '../application/ports/group.repository';

@Module({})
export class GroupsInfrastructureModule {
  static use(
    databaseDriver: 'in-memory' | 'type-orm',
    cacheDriver: 'in-memory' | 'noop' | 'redis',
  ) {
    const persistenceModule = this.selectPersistenceModule(databaseDriver);
    const cacheModule = this.selectCacheModule(cacheDriver);

    return {
      module: GroupsInfrastructureModule,
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
        return GroupsInMemoryCacheModule;
      case 'noop':
        return GroupsNoopCacheModule;
      case 'redis':
        return GroupsRedisCacheModule;
      default:
        return GroupsNoopCacheModule;
    }
  }
}
