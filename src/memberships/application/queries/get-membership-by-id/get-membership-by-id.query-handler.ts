import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { MembershipRepository } from '../../ports/membership.repository';
import { GetMembershipByIdQuery } from './get-membership-by-id.query';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { Logger, NotFoundException } from '@nestjs/common';
import { Group } from 'src/groups/domain/group';
import { User } from 'src/user/domain/entities/user.entity';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { ResponseMembershipDto } from 'src/memberships/application/dtos/response-membership.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';
import { ResponseGroupDto } from 'src/groups/application/dtos/response-group.dto';

@QueryHandler(GetMembershipByIdQuery)
export class GetMembershipByIdQueryHandler
  implements IQueryHandler<GetMembershipByIdQuery>
{
  private readonly logger = new Logger(GetMembershipByIdQueryHandler.name);
  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly queryBus: QueryBus,
  ) {}
  async execute(query: GetMembershipByIdQuery): Promise<ResponseMembershipDto> {
    this.logger.debug('Executing GetMembershipByIdQuery');

    //TODO: Cache the membership by id

    const membership = await this.membershipRepository.findById(query.id);

    if (!membership) {
      this.logger.error(`Membership not found for id: ${query.id}`);
      throw new NotFoundException('Membership not found');
    }

    const group: ResponseGroupDto = await this.queryBus.execute(
      new GetGroupByIdQuery(membership.groupId),
    );

    if (!group) {
      this.logger.error(`Group not found for id: ${membership.groupId}`);
      throw new NotFoundException('Group not found');
    }

    const user: ResponseUserDto = await this.queryBus.execute(
      new GetUserByIdQuery(membership.userId),
    );

    if (!user) {
      this.logger.error(`User not found for id: ${membership.userId}`);
      throw new NotFoundException('User not found');
    }

    return new ResponseMembershipDto(
      membership.id,
      membership.createdAt,
      membership.updatedAt,
      [group],
      [user],
    );
  }
}
