import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersDomainModule } from './domain/users-domain.module';
import { UsersApplicationModule } from './application/users-application.module';
import { UsersInfrastructureModule } from './infrastructure/users-infrastructure.module';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';

@Module({})
export class UsersModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: UsersModule,
      imports: [
        UsersDomainModule,
        UsersApplicationModule,
        UsersInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],

      exports: [UsersApplicationModule, UsersInfrastructureModule],
    };
  }
}
