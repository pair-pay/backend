import { Module } from '@nestjs/common';
import { AuthInMemoryPersistanceModule } from './persistance/in-memory/in-memory-persistance.module';
import { AuthTypeOrmPersistanceModule } from './persistance/type-orm/type-orm-persistance.module';
import { AuthInMemoryCacheModule } from './cache/in-memory/in-memory-cache.module';
import { AuthNoopCacheModule } from './cache/noop/noop-cache.module';
import { AuthRedisCacheModule } from './cache/redis/redis-cache.module';
import { JwtService } from 'src/auth/application/ports/jwt.service';
import { JwtServiceImpl } from './jwt/jwt.service.impl';
import { TokenGeneratorService } from './services/token-generator.service';

@Module({})
export class AuthInfrastructureModule {
  static use(
    databaseDriver: 'in-memory' | 'type-orm',
    cacheDriver: 'in-memory' | 'noop' | 'redis',
  ) {
    const persistenceModule = this.selectPersistenceModule(databaseDriver);
    const cacheModule = this.selectCacheModule(cacheDriver);

    return {
      module: AuthInfrastructureModule,
      imports: [persistenceModule, cacheModule],
      providers: [
        {
          provide: JwtService,
          useClass: JwtServiceImpl,
        },
        TokenGeneratorService,
      ],
      exports: [
        persistenceModule,
        cacheModule,
        JwtService,
        TokenGeneratorService,
      ],
    };
  }

  private static selectPersistenceModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return AuthInMemoryPersistanceModule;
      case 'type-orm':
        return AuthTypeOrmPersistanceModule;
      default:
        return AuthInMemoryPersistanceModule;
    }
  }

  private static selectCacheModule(driver: string) {
    switch (driver) {
      case 'in-memory':
        return AuthInMemoryCacheModule;
      case 'noop':
        return AuthNoopCacheModule;
      case 'redis':
        return AuthRedisCacheModule;
      default:
        return AuthNoopCacheModule;
    }
  }
}
