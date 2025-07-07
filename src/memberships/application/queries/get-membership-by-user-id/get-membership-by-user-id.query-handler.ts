import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { MembershipRepository } from '../../ports/membership.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { Logger } from '@nestjs/common';
import { GetMembershipByUserIdQuery } from './get-membership-by-user-id.query';
import { Group } from 'src/groups/domain/group';
import { User } from 'src/user/domain/entities/user.entity';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { ResponseMembershipDto } from '../../dtos/response-membership.dto';
import { ResponseGroupDto } from 'src/groups/application/dtos/response-group.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';

@QueryHandler(GetMembershipByUserIdQuery)
export class GetMembershipByUserIdQueryHandler
  implements IQueryHandler<GetMembershipByUserIdQuery>
{
  private readonly logger = new Logger(GetMembershipByUserIdQueryHandler.name);
  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(
    query: GetMembershipByUserIdQuery,
  ): Promise<ResponseMembershipDto[]> {
    this.logger.debug('Executing GetMembershipByUserIdQuery');

    //TODO: Cache the membership by id

    const memberships = await this.membershipRepository.findByUserId(
      query.userId,
    );

    let groups: ResponseGroupDto[] = [];
    let users: ResponseUserDto[] = [];

    for (const membership of memberships) {
      const group: ResponseGroupDto = await this.queryBus.execute(
        new GetGroupByIdQuery(membership.groupId),
      );
      groups.push(group);

      const user: ResponseUserDto = await this.queryBus.execute(
        new GetUserByIdQuery(membership.userId),
      );
      users.push(user);
    }

    return memberships.map(
      (membership) =>
        new ResponseMembershipDto(
          membership.id,
          membership.createdAt,
          membership.updatedAt,
          groups,
          users,
        ),
    );
  }
}
