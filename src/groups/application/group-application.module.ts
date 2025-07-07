import { DynamicModule, Module, Type } from '@nestjs/common';
import { GroupsController } from 'src/groups/presenters/http/groups.controller';
import { GroupsDomainModule } from '../domain/groups-domain.module';
import { GroupCreatedEventHandler } from './event-handlers/group-created.event-handler';
import { GroupUpdatedEventHandler } from './event-handlers/group-updated.event-handler';
import { GroupDeletedEventHandler } from './event-handlers/group-deleted.event-handler';
import { GetAllGroupsQueryHandler } from './queries/get-all-groups/get-all-groups.query-handler';
import { GetGroupByIdQueryHandler } from './queries/get-group-by-id/get-groups-by-id.query-handler';
import { CreateGroupCommandHandler } from './commands/create-group.command-handler';
import { UpdateGroupCommandHandler } from './commands/update-group.command-handler';
import { DeleteGroupCommandHandler } from './commands/delete-group.command-handler';
import { GroupService } from './services/group.service';
import { GroupFactory } from 'src/groups/domain/factories/group.factory';
import { UsersInfrastructureModule } from 'src/user/infrastructure/users-infrastructure.module';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

const CommandHandlers = [
  CreateGroupCommandHandler,
  UpdateGroupCommandHandler,
  DeleteGroupCommandHandler,
];

const QueryHandlers = [GetAllGroupsQueryHandler, GetGroupByIdQueryHandler];

const EventHandlers = [
  GroupCreatedEventHandler,
  GroupUpdatedEventHandler,
  GroupDeletedEventHandler,
];

@Module({
  imports: [GroupsDomainModule],
  controllers: [GroupsController],
  providers: [
    GroupService,
    GroupFactory,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class GroupsApplicationModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
    options: ApplicationBootstrapOptions,
  ) {
    return {
      module: GroupsApplicationModule,
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
