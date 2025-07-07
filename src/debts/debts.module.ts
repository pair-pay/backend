import { DynamicModule, Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { DebtsInfrastructureModule } from './infrastructure/debts-infrastructure.module';
import { DebtsApplicationModule } from './application/debts-application.module';
import { DebtsDomainModule } from './domain/debts.module';
import { AuthInfrastructureModule } from 'src/auth/infrastructure/auth-infrastructure.module';

@Module({})
export class DebtsModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: DebtsModule,
      imports: [
        DebtsDomainModule,
        DebtsApplicationModule,
        DebtsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
      exports: [DebtsApplicationModule, DebtsInfrastructureModule],
    };
  }
}
