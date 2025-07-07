import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { MembershipRepository } from '../../ports/membership.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { Logger } from '@nestjs/common';
import { GetMembershipByGroupIdQuery } from './get-membership-by-group-id.query';
import { Group } from 'src/groups/domain/group';
import { User } from 'src/user/domain/entities/user.entity';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { ResponseMembershipDto } from '../../dtos/response-membership.dto';
import { ResponseGroupDto } from 'src/groups/application/dtos/response-group.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';

@QueryHandler(GetMembershipByGroupIdQuery)
export class GetMembershipByGroupIdQueryHandler
  implements IQueryHandler<GetMembershipByGroupIdQuery>
{
  private readonly logger = new Logger(GetMembershipByGroupIdQueryHandler.name);
  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(
    query: GetMembershipByGroupIdQuery,
  ): Promise<ResponseMembershipDto[]> {
    this.logger.debug('Executing GetMembershipByGroupIdQuery');

    //TODO: Cache the membership by id

    const memberships = await this.membershipRepository.findByGroupId(
      query.groupId,
    );

    const group: ResponseGroupDto = await this.queryBus.execute(
      new GetGroupByIdQuery(query.groupId),
    );

    const responseMembershipDtos: ResponseMembershipDto[] = [];

    for (const membership of memberships) {
      const user: ResponseUserDto = await this.queryBus.execute(
        new GetUserByIdQuery(membership.userId),
      );

      responseMembershipDtos.push(
        new ResponseMembershipDto(
          membership.id,
          membership.createdAt,
          membership.updatedAt,
          [group],
          [user],
        ),
      );
    }

    return responseMembershipDtos;
  }
}
