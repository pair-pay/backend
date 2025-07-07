// Import your commands, queries, and event handlers here

import { DynamicModule, Module, Type } from '@nestjs/common';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { DebtsService } from './services/debt.service';
import { DebtsDomainModule } from '../domain/debts.module';
import { CreatedDebtEventHandler } from './event-handlers/created-debt/created-debt.event-handler';
import { UpdatedDebtEventHandler } from './event-handlers/updated-debt/updated-debt.event-handler';
import { DeletedDebtEventHandler } from './event-handlers/deleted-debt/deleted-debt.event-handler';
import { GetAllDebtsQueryHandler } from './queries/get-all-debts/get-all-debts.query-handler';
import { GetDebtByIdQueryHandler } from './queries/get-debt-by-id/get-debt-by-id.query-handler';
import { GetDebtsByExpenseIdQueryHandler } from './queries/get-debts-by-expense-id/get-debts-by-expense-id.query-handler';
import { GetDebtsByUserIdQueryHandler } from './queries/get-debts-by-user-id/get-debts-by-user-id.query-handler';
import { GetDebtsByExpenseIdAndUserIdQueryHandler } from './queries/get-debts-by-expense-id-and-user-id/get-debts-by-expense-id-and-user-id.query-handler';
import { GetDebtsByExpenseIdAndUserIdAndStatusQueryHandler } from './queries/get-debts-by-expense-id-and-user-id-and-status/get-debts-by-expense-id-and-user-id-and-status.query-handler';
import { CreateDebtCommandHandler } from './commands/create-debt/create-debt.command-handler';
import { DeleteDebtCommandHandler } from './commands/delete-debt/delete-debt.command-handler';
import { UpdateDebtStatusCommandHandler } from './commands/update-debt-status/update-debt-status.command-handler';
import { DebtsInfrastructureModule } from '../infrastructure/debts-infrastructure.module';
import { DebtsController } from '../presenters/http/debts.controller';
import { UpdateDebtCommandHandler } from './commands/update-debt/update-debt.command-handler';
import { ExpenseAmountUpdatedDebtIntegrationEventHandler } from './event-handlers/expense-amount-updated-integration/expense-amount-updated-integration.event-handler';
import { ExpenseCreatedDebtIntegrationEventHandler } from './event-handlers/expense-created-integration/expense-created-integration.event-handler';
import { AuthInfrastructureModule } from 'src/auth/infrastructure/auth-infrastructure.module';

const CommandHandlers = [
  CreateDebtCommandHandler,
  UpdateDebtCommandHandler,
  UpdateDebtStatusCommandHandler,
  DeleteDebtCommandHandler,
];

const QueryHandlers = [
  GetAllDebtsQueryHandler,
  GetDebtByIdQueryHandler,
  GetDebtsByExpenseIdQueryHandler,
  GetDebtsByUserIdQueryHandler,
  GetDebtsByExpenseIdAndUserIdQueryHandler,
  GetDebtsByExpenseIdAndUserIdAndStatusQueryHandler,
];

const EventHandlers = [
  CreatedDebtEventHandler,
  UpdatedDebtEventHandler,
  DeletedDebtEventHandler,
];

const IntegrationEventHandlers = [
  ExpenseAmountUpdatedDebtIntegrationEventHandler,
  ExpenseCreatedDebtIntegrationEventHandler,
];

@Module({
  imports: [DebtsDomainModule],
  controllers: [DebtsController],
  providers: [
    DebtsService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ...IntegrationEventHandlers,
  ],
})
export class DebtsApplicationModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
    options: ApplicationBootstrapOptions,
  ) {
    return {
      module: DebtsApplicationModule,
      imports: [
        infrastructureModule,
        DebtsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
        AuthInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
    };
  }
}
