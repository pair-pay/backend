import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMembershipDto } from '../dto/create-membership.dto';
import { DeleteMembershipDto } from '../dto/delete-membership.dto';
import { GetMembershipByUserIdQuery } from 'src/memberships/application/queries/get-membership-by-user-id/get-membership-by-user-id.query';
import { GetMembershipByGroupIdQuery } from 'src/memberships/application/queries/get-membership-by-group-id/get-membership-by-group-id.query';
import { GetMembershipByUserIdGroupIdQuery } from 'src/memberships/application/queries/get-membership-by-user-id-group-id/get-membership-by-user-id-group-id.query';
import { MembershipService } from 'src/memberships/application/services/membership.service';
import { GroupResponseDto } from 'src/groups/presenters/http/dto/group-response.dto';
import { MembershipResponseDto } from '../dto/membership-response.dto';
import { GetAllMembershipsQuery } from 'src/memberships/application/queries/get-all-memberships/get-all-memberships.query';
import { GetMembershipByIdQuery } from 'src/memberships/application/queries/get-membership-by-id/get-membership-by-id.query';
import { CreateMembershipCommand } from 'src/memberships/application/commands/create-member/create-member.command';
import { DeleteMembershipCommand } from 'src/memberships/application/commands/delete-membership/delete-membership.command';
import { MembershipHttpMapper } from '../mapper/membership-http.mapper';
import { GetUsersByGroupIdQuery } from 'src/memberships/application/queries/get-users-by-group-id/get-users-by-group-id.query';
import { UserHttpMapper } from 'src/user/presenters/http/mapper/user-http.mapper';
import { GroupHttpMapper } from 'src/groups/presenters/http/mapper/group-http.mapper';

@ApiTags('memberships')
@Controller('memberships')
export class MembershipsController {
  private readonly logger = new Logger(MembershipsController.name);

  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, type: [MembershipResponseDto] })
  async getAllMemberships() {
    const memberships = await this.membershipService.findAll(
      new GetAllMembershipsQuery(),
    );
    return memberships.map((membership) =>
      MembershipHttpMapper.toResponseDto(membership),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get groups by ID' })
  @ApiResponse({ status: 200, type: MembershipResponseDto })
  async getMembershipById(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.membershipService.findById(
      new GetMembershipByIdQuery(id),
    );
    return MembershipHttpMapper.toResponseDto(result);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get groups by user ID' })
  @ApiResponse({ status: 200, type: [MembershipResponseDto] })
  async getMembershipsByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    const memberships = await this.membershipService.findByUserId(
      new GetMembershipByUserIdQuery(userId),
    );
    return memberships.map((membership) =>
      MembershipHttpMapper.toResponseDto(membership),
    );
  }

  @Get('group/:groupId')
  @ApiOperation({ summary: 'Get groups by group ID' })
  @ApiResponse({ status: 200, type: [MembershipResponseDto] })
  async getMembershipsByGroupId(
    @Param('groupId', ParseUUIDPipe) groupId: string,
  ) {
    const memberships = await this.membershipService.findByGroupId(
      new GetMembershipByGroupIdQuery(groupId),
    );

    return memberships.map((membership) =>
      MembershipHttpMapper.toResponseDto(membership),
    );
  }

  @Get('group/:groupId/user/:userId')
  @ApiOperation({ summary: 'Get groups by group ID and user ID' })
  @ApiResponse({ status: 200, type: [MembershipResponseDto] })
  async getMembershipsByGroupIdAndUserId(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const memberships = await this.membershipService.findByGroupIdAndUserId(
      new GetMembershipByUserIdGroupIdQuery(groupId, userId),
    );
    return MembershipHttpMapper.toResponseDto(memberships);
  }

  @Get('group/:groupId/users')
  @ApiOperation({ summary: 'Get users by group ID' })
  @ApiResponse({ status: 200, description: 'Returns all users of a group' })
  async getUsersByGroupId(@Param('groupId', ParseUUIDPipe) groupId: string) {
    const users = await this.membershipService.findUsersByGroupId(
      new GetUsersByGroupIdQuery(groupId),
    );
    return users.map(UserHttpMapper.toResponseDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new groups' })
  @ApiResponse({ status: 201, type: MembershipResponseDto })
  async createMembership(@Body() createMembershipDto: CreateMembershipDto) {
    const membership = await this.membershipService.createMembership(
      new CreateMembershipCommand(
        createMembershipDto.groupId,
        createMembershipDto.userId,
      ),
    );
    return MembershipHttpMapper.toResponseDto(membership);
  }

  // @Put()
  // @ApiOperation({ summary: 'Update a groups' })
  // @ApiResponse({ status: 200, type: GroupResponseDto })
  // async updateMembership(@Body() updateDto: UpdateMembershipDto) {
  //   return this.membershipService.update(
  //     new UpdateGroupCommand(updateDto.id, updateDto.name),
  //   );
  // }

  @Delete()
  @ApiOperation({ summary: 'Delete a groups' })
  @ApiResponse({ status: 200, type: GroupResponseDto })
  async deleteMembership(@Body() deleteDto: DeleteMembershipDto) {
    const membership = await this.membershipService.deleteMembership(
      new DeleteMembershipCommand(deleteDto.id),
    );
    return MembershipHttpMapper.toResponseDto(membership);
  }
}
