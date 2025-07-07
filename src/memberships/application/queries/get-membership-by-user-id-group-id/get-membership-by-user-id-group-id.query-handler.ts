import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { MembershipRepository } from '../../ports/membership.repository';
import { GetMembershipByIdQuery } from '../get-membership-by-id/get-membership-by-id.query';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { Logger } from '@nestjs/common';
import { GetMembershipByUserIdQuery } from '../get-membership-by-user-id/get-membership-by-user-id.query';
import { GetMembershipByUserIdGroupIdQuery } from './get-membership-by-user-id-group-id.query';
import { Group } from 'src/groups/domain/group';
import { User } from 'src/user/domain/entities/user.entity';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { ResponseMembershipDto } from 'src/memberships/application/dtos/response-membership.dto';
import { ResponseGroupDto } from 'src/groups/application/dtos/response-group.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';

@QueryHandler(GetMembershipByUserIdGroupIdQuery)
export class GetMembershipByUserIdGroupIdQueryHandler
  implements IQueryHandler<GetMembershipByUserIdGroupIdQuery>
{
  private readonly logger = new Logger(
    GetMembershipByUserIdGroupIdQueryHandler.name,
  );
  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(
    query: GetMembershipByUserIdGroupIdQuery,
  ): Promise<ResponseMembershipDto> {
    this.logger.debug('Executing GetMembershipByUserIdGroupIdQuery');

    //TODO: Cache the membership by id

    const membership = await this.membershipRepository.findByGroupIdAndUserId(
      query.groupId,
      query.userId,
    );

    const group: ResponseGroupDto = await this.queryBus.execute(
      new GetGroupByIdQuery(query.groupId),
    );
    const user: ResponseUserDto = await this.queryBus.execute(
      new GetUserByIdQuery(query.userId),
    );

    return new ResponseMembershipDto(
      membership.id,
      membership.createdAt,
      membership.updatedAt,
      [group],
      [user],
    );
  }
}
