import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { GetGroupByIdQuery } from './get-group-by-id.query';
import { Group } from 'src/groups/domain/group';
import { Logger } from '@nestjs/common';
import { GroupRepository } from '../../ports/group.repository';
import { ResponseGroupDto } from '../../dtos/response-group.dto';
import { GetUsersByGroupIdQuery } from 'src/memberships/application/queries/get-users-by-group-id/get-users-by-group-id.query';

@QueryHandler(GetGroupByIdQuery)
export class GetGroupByIdQueryHandler
  implements IQueryHandler<GetGroupByIdQuery>
{
  private readonly logger = new Logger(GetGroupByIdQueryHandler.name);
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(query: GetGroupByIdQuery): Promise<ResponseGroupDto> {
    this.logger.debug('Executing GetGroupByIdQuery');

    //TODO: Cache the group by id

    const group = await this.groupRepository.findById(query.id);
    const users = await this.queryBus.execute(
      new GetUsersByGroupIdQuery(group.id),
    );
    return new ResponseGroupDto(
      group.id,
      group.createdAt,
      group.updatedAt,
      group.name.value,
      group.description.value,
      users,
    );
  }
}
