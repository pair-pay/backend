import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { GroupsTypeOrmEntity } from 'src/groups/infrastructure/persistance/type-orm/entities/groups-type-orm.entity';
import { MembershipTypeOrmEntity } from 'src/memberships/infrastructure/persistance/type-orm/entities/membership-type-orm.entity';
import { UsersInMemoryCacheModule } from 'src/user/infrastructure/cache/in-memory/in-memory-cache.module';
import { UsersNoopCacheModule } from 'src/user/infrastructure/cache/noop/noop-cache.module';
import { UsersRedisCacheModule } from 'src/user/infrastructure/cache/redis/redis-cache.module';
import { UsersInMemoryPersistanceModule } from 'src/user/infrastructure/persistance/in-memory/in-memory-persistance.module';
import { UserTypeOrmEntity } from 'src/user/infrastructure/persistance/type-orm/entities/user-type-orm.entity';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const persistenceModule = this.selectPersistenceModule(
      options.databaseDriver,
    );
    const cacheModule = this.selectCacheModule(options.cacheDriver);

    return {
      module: CoreModule,
      imports: [...persistenceModule, ...cacheModule],
    };
  }

  private static selectPersistenceModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return [UsersInMemoryPersistanceModule];
      case 'type-orm':
        return [
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadEntities:
              Boolean(process.env.TYPE_ORM_AUTO_LOAD_ENTITIES) || true,
            synchronize: Boolean(process.env.TYPE_ORM_SYNCHRONIZE) || true,
          }),
        ];
      default:
        throw new Error(`Unsupported driver: ${driver}`);
    }
  }

  private static selectCacheModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return [UsersInMemoryCacheModule];
      case 'noop':
        return [UsersNoopCacheModule];
      case 'redis':
        return [UsersRedisCacheModule];
      default:
        throw new Error(`Unsupported cache driver: ${driver}`);
    }
  }
}
