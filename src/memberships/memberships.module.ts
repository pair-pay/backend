import { DynamicModule, Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { MembershipsDomainModule } from './domain/memberships-domain.module';
import { MembershipsInfrastructureModule } from './infrastructure/memberships-infrastructure.module';
import { MembershipApplicationModule } from './application/membership-application.module';

@Module({})
export class MembershipsModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: MembershipsModule,
      imports: [
        MembershipsDomainModule,
        MembershipApplicationModule,
        MembershipsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
      exports: [MembershipApplicationModule, MembershipsInfrastructureModule],
    };
  }
}
