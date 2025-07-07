import { DynamicModule, Module, Type } from '@nestjs/common';
import { ExpensesDomainModule } from './domain/expenses-domain.module';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { ExpensesApplicationModule } from './application/expenses-application.module';
import { ExpensesInfrastructureModule } from './infrastructure/expenses-infrastructure.module';

@Module({})
export class ExpensesModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: ExpensesModule,
      imports: [
        ExpensesDomainModule,
        ExpensesApplicationModule,
        ExpensesInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],

      exports: [ExpensesApplicationModule, ExpensesInfrastructureModule],
    };
  }
}
