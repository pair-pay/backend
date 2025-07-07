import { DynamicModule, Module, Type } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserService } from './services/user.service';

// Import your commands, queries, and event handlers here
import { CreateUserCommandHandler } from './commands/create-user.command-handler';
import { UpdateUserCommandHandler } from './commands/update-user.command-handler';
import { DeleteUserCommandHandler } from './commands/delete-user.command-handler';
import { GetAllUsersQueryHandler } from './queries/get-all-users/get-all-users.query-handler';
import { GetUserByIdQueryHandler } from './queries/get-user-by-id/get-user-by-id.query-handler';
import { UserCreatedEventHandler } from './event-handlers/user-created.event-handler';
import { UserUpdatedEventHandler } from './event-handlers/user-updated.event-handler';
import { UserDeletedEventHandler } from './event-handlers/user-deleted.event-handler';
import { UsersDomainModule } from '../domain/users-domain.module';
import { UsersController } from '../presenters/http/users.controller';
import { UsersInfrastructureModule } from '../infrastructure/users-infrastructure.module';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

const CommandHandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
];

const QueryHandlers = [GetAllUsersQueryHandler, GetUserByIdQueryHandler];

const EventHandlers = [
  UserCreatedEventHandler,
  UserUpdatedEventHandler,
  UserDeletedEventHandler,
];

@Module({
  imports: [UsersDomainModule],
  controllers: [UsersController],
  providers: [
    UserService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class UsersApplicationModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
    options: ApplicationBootstrapOptions,
  ) {
    return {
      module: UsersApplicationModule,
      imports: [
        infrastructureModule,
        UsersInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
    };
  }
}
