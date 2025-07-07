import { DynamicModule, Module, Type } from '@nestjs/common';
import { GroupsDomainModule } from './domain/groups-domain.module';
import { GroupsApplicationModule } from './application/group-application.module';
import { GroupsInfrastructureModule } from './infrastructure/groups-infrastructure.module';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';

@Module({})
export class GroupsModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: GroupsModule,
      imports: [
        GroupsDomainModule,
        GroupsApplicationModule,
        GroupsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
      exports: [GroupsApplicationModule, GroupsInfrastructureModule],
    };
  }
}
