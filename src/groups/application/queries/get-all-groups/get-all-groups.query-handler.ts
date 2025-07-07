import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { GroupRepository } from 'src/groups/application/ports/group.repository';
import { GetAllGroupsQuery } from './get-all-groups.query';
import { Group } from 'src/groups/domain/group';
import { Logger } from '@nestjs/common';
import { GetUsersByGroupIdQuery } from 'src/memberships/application/queries/get-users-by-group-id/get-users-by-group-id.query';
import { ResponseGroupDto } from '../../dtos/response-group.dto';
import { User } from 'src/user/domain/entities/user.entity';

@QueryHandler(GetAllGroupsQuery)
export class GetAllGroupsQueryHandler
  implements IQueryHandler<GetAllGroupsQuery>
{
  private readonly logger = new Logger(GetAllGroupsQueryHandler.name);
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(): Promise<ResponseGroupDto[]> {
    this.logger.debug('Executing GetAllGroupsQuery');
    const groups = await this.groupRepository.findAll();

    let response: ResponseGroupDto[] = [];
    for (const group of groups) {
      const users = await this.queryBus.execute(
        new GetUsersByGroupIdQuery(group.id),
      );
      const responseGroup = new ResponseGroupDto(
        group.id,
        group.createdAt,
        group.updatedAt,
        group.name.value,
        group.description.value,
        users,
      );
      response.push(responseGroup);
    }

    //TODO: Cache the groups

    return response;
  }
}
