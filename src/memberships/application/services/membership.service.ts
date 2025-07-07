import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Membership } from '../../domain/entities/membership.entity';
import { GetAllMembershipsQuery } from '../queries/get-all-memberships/get-all-memberships.query';
import { GetMembershipByIdQuery } from '../queries/get-membership-by-id/get-membership-by-id.query';
import { GetMembershipByGroupIdQuery } from '../queries/get-membership-by-group-id/get-membership-by-group-id.query';
import { GetMembershipByUserIdQuery } from '../queries/get-membership-by-user-id/get-membership-by-user-id.query';
import { GetMembershipByUserIdGroupIdQuery } from '../queries/get-membership-by-user-id-group-id/get-membership-by-user-id-group-id.query';
import { CreateMembershipCommand } from '../commands/create-member/create-member.command';
import { DeleteMembershipCommand } from '../commands/delete-membership/delete-membership.command';
import { GetUsersByGroupIdQuery } from '../queries/get-users-by-group-id/get-users-by-group-id.query';
import { Group } from 'src/groups/domain/group';
import { User } from 'src/user/domain/entities/user.entity';
import { ResponseMembershipDto } from '../dtos/response-membership.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';

@Injectable()
export class MembershipService {
  private readonly logger = new Logger(MembershipService.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findAll(
    getAllMembershipsQuery: GetAllMembershipsQuery,
  ): Promise<ResponseMembershipDto[]> {
    return this.queryBus.execute(getAllMembershipsQuery);
  }

  async findById(
    getMembershipByIdQuery: GetMembershipByIdQuery,
  ): Promise<ResponseMembershipDto> {
    return this.queryBus.execute(getMembershipByIdQuery);
  }

  async findByGroupId(
    getMembershipsByGroupIdQuery: GetMembershipByGroupIdQuery,
  ): Promise<ResponseMembershipDto[]> {
    return this.queryBus.execute(getMembershipsByGroupIdQuery);
  }

  async findByUserId(
    getMembershipsByUserIdQuery: GetMembershipByUserIdQuery,
  ): Promise<ResponseMembershipDto[]> {
    return this.queryBus.execute(getMembershipsByUserIdQuery);
  }

  async findByGroupIdAndUserId(
    getMembershipByGroupIdAndUserIdQuery: GetMembershipByUserIdGroupIdQuery,
  ): Promise<ResponseMembershipDto> {
    return this.queryBus.execute(getMembershipByGroupIdAndUserIdQuery);
  }

  async createMembership(
    createMembershipCommand: CreateMembershipCommand,
  ): Promise<ResponseMembershipDto> {
    return this.commandBus.execute(createMembershipCommand);
  }

  async deleteMembership(
    deleteMembershipCommand: DeleteMembershipCommand,
  ): Promise<ResponseMembershipDto> {
    return this.commandBus.execute(deleteMembershipCommand);
  }

  /**
   * Finds all users by groupId
   * @param query - Query containing groupId
   * @returns Promise containing an array of User entities
   */
  async findUsersByGroupId(
    query: GetUsersByGroupIdQuery,
  ): Promise<ResponseUserDto[]> {
    return this.queryBus.execute(query);
  }
}
