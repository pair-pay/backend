import { DynamicModule, Module, Type } from '@nestjs/common';
import { GroupsController } from 'src/groups/presenters/http/groups.controller';
import { GetAllMembershipsQueryHandler } from './queries/get-all-memberships/get-all-memberships.query-handler';
import { GetMembershipByIdQueryHandler } from './queries/get-membership-by-id/get-membership-by-id.query-handler';
import { UsersInfrastructureModule } from 'src/user/infrastructure/users-infrastructure.module';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { GetMembershipByUserIdGroupIdQueryHandler } from './queries/get-membership-by-user-id-group-id/get-membership-by-user-id-group-id.query-handler';
import { GetMembershipByUserIdQueryHandler } from './queries/get-membership-by-user-id/get-membership-by-user-id.query-handler';
import { GetMembershipByGroupIdQueryHandler } from './queries/get-membership-by-group-id/get-membership-by-group-id.query-handler';
import { CreateMembershipCommandHandler } from './commands/create-member/create-member.command-handler';
import { DeleteMembershipCommandHandler } from './commands/delete-membership/delete-membership.command-handler';
import { MembershipDeletedEventHandler } from './event-handlers/membership-deleted/membership-deleted.event-handler';
import { MembershipCreatedEventHandler } from './event-handlers/membership-created/membership-created.event-handler';
import { MembershipsDomainModule } from '../domain/memberships-domain.module';
import { MembershipService } from './services/membership.service';
import { MembershipFactory } from '../domain/factories/membership.factory';
import { GroupsInfrastructureModule } from 'src/groups/infrastructure/groups-infrastructure.module';
import { MembershipsController } from '../presenters/http/controller/memberships.controller';
import { GetUsersByGroupIdQueryHandler } from './queries/get-users-by-group-id/get-users-by-group-id.query-handler';

const CommandHandlers = [
  CreateMembershipCommandHandler,
  DeleteMembershipCommandHandler,
];

const QueryHandlers = [
  GetAllMembershipsQueryHandler,
  GetMembershipByIdQueryHandler,
  GetMembershipByUserIdQueryHandler,
  GetMembershipByGroupIdQueryHandler,
  GetMembershipByUserIdGroupIdQueryHandler,
  GetUsersByGroupIdQueryHandler,
];

const EventHandlers = [
  MembershipCreatedEventHandler,
  MembershipDeletedEventHandler,
];

@Module({
  imports: [MembershipsDomainModule],
  controllers: [MembershipsController],
  providers: [
    MembershipService,
    MembershipFactory,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class MembershipApplicationModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
    options: ApplicationBootstrapOptions,
  ) {
    return {
      module: MembershipApplicationModule,
      imports: [
        infrastructureModule,
        UsersInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
        GroupsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
    };
  }
}
