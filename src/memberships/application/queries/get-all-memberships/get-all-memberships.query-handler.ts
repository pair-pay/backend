import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { MembershipRepository } from '../../ports/membership.repository';
import { GetAllMembershipsQuery } from './get-all-memberships.query';
import { Group } from 'src/groups/domain/group';
import { Logger } from '@nestjs/common';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { ResponseMembershipDto } from 'src/memberships/application/dtos/response-membership.dto';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { ResponseGroupDto } from 'src/groups/application/dtos/response-group.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';

@QueryHandler(GetAllMembershipsQuery)
export class GetAllMembershipsQueryHandler
  implements IQueryHandler<GetAllMembershipsQuery>
{
  private readonly logger = new Logger(GetAllMembershipsQueryHandler.name);
  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(): Promise<ResponseMembershipDto[]> {
    this.logger.debug('Executing GetAllMembershipsQuery');
    const memberships = await this.membershipRepository.findAll();

    const responseMemberships: ResponseMembershipDto[] = [];

    for (const membership of memberships) {
      const group: ResponseGroupDto = await this.queryBus.execute(
        new GetGroupByIdQuery(membership.groupId),
      );
      const user: ResponseUserDto = await this.queryBus.execute(
        new GetUserByIdQuery(membership.userId),
      );

      responseMemberships.push(
        new ResponseMembershipDto(
          membership.id,
          membership.createdAt,
          membership.updatedAt,
          [group],
          [user],
        ),
      );
    }

    //TODO: Cache the memberships

    return responseMemberships;
  }
}
