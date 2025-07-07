import { DynamicModule, Module, Type } from '@nestjs/common';
import { CreateExpenseCommandHandler } from './commands/create-expense.command-handler';
import { UpdateExpenseCommandHandler } from './commands/update-expense.command-handler';
import { DeleteExpenseCommandHandler } from './commands/delete-expense.command-handler';
import { GetAllExpensesQueryHandler } from './queries/get-all-expenses.query-handler';
import { GetExpenseByIdQueryHandler } from './queries/get-expense-by-id.query-handler';
import { GetExpenseByUserIdQueryHandler } from './queries/get-expense-by-user-id.query-handler';
import { GetExpenseByGroupIdQueryHandler } from './queries/get-expense-by-group-id.query-handler';
import { ExpenseCreatedEventHandler } from './event-handlers/expense-created.event-handler';
import { ExpenseUpdatedEventHandler } from './event-handlers/expense-updated.event-handler';
import { ExpenseDeletedEventHandler } from './event-handlers/expense-deleted.event-handler';
import { ExpensesDomainModule } from '../domain/expenses-domain.module';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { ExpensesController } from '../presenters/http/expenses.controller';
import { ExpensesInfrastructureModule } from '../infrastructure/expenses-infrastructure.module';
import { ExpenseService } from './expense.service';
import { GroupsInfrastructureModule } from 'src/groups/infrastructure/groups-infrastructure.module';
import { UsersInfrastructureModule } from 'src/user/infrastructure/users-infrastructure.module';
import { MembershipsInfrastructureModule } from 'src/memberships/infrastructure/memberships-infrastructure.module';
import { DebtsInfrastructureModule } from 'src/debts/infrastructure/debts-infrastructure.module';
import { DebtsApplicationModule } from 'src/debts/application/debts-application.module';
import { GetUsersByGroupIdQueryHandler } from 'src/memberships/application/queries/get-users-by-group-id/get-users-by-group-id.query-handler';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';
import { GetMembershipByUserIdGroupIdQuery } from 'src/memberships/application/queries/get-membership-by-user-id-group-id/get-membership-by-user-id-group-id.query';
import { GetDebtsByExpenseIdQueryHandler } from 'src/debts/application/queries/get-debts-by-expense-id/get-debts-by-expense-id.query-handler';
import { UpdateExpenseAmountCommandHandler } from './commands/update-expense-amount.command-handler';
import { GetAllSplitTypesQueryHandler } from './queries/get-all-split-types.query-handler';
import { GetUserByIdQueryHandler } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query-handler';
import { GetGroupByIdQueryHandler } from 'src/groups/application/queries/get-group-by-id/get-groups-by-id.query-handler';

// Import your commands, queries, and event handlers here

const CommandHandlers = [
  CreateExpenseCommandHandler,
  UpdateExpenseCommandHandler,
  UpdateExpenseAmountCommandHandler,
  DeleteExpenseCommandHandler,
];

const QueryHandlers = [
  GetAllExpensesQueryHandler,
  GetExpenseByIdQueryHandler,
  GetExpenseByUserIdQueryHandler,
  GetExpenseByGroupIdQueryHandler,
  GetAllSplitTypesQueryHandler,
];

const ExternalQueryHandlers = [
  GetUserByIdQueryHandler,
  GetGroupByIdQueryHandler,
  GetDebtsByExpenseIdQueryHandler,
];

const EventHandlers = [
  ExpenseCreatedEventHandler,
  ExpenseUpdatedEventHandler,
  ExpenseDeletedEventHandler,
];

@Module({
  imports: [ExpensesDomainModule],
  controllers: [ExpensesController],
  providers: [
    ExpenseService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...ExternalQueryHandlers,
    ...EventHandlers,
  ],
})
export class ExpensesApplicationModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
    options: ApplicationBootstrapOptions,
  ) {
    return {
      module: ExpensesApplicationModule,
      imports: [
        infrastructureModule,
        ExpensesInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
        GroupsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
        UsersInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
        MembershipsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
        DebtsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
    };
  }
}
