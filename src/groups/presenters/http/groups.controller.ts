import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GroupService } from '../../application/services/group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { DeleteGroupDto } from './dto/delete-group.dto';
import { GroupResponseDto } from './dto/group-response.dto';
import { CreateGroupCommand } from 'src/groups/application/commands/create-group.command';
import { UpdateGroupCommand } from 'src/groups/application/commands/update-group.command';
import { DeleteGroupCommand } from 'src/groups/application/commands/delete-group.command';
import { GroupHttpMapper } from './mapper/group-http.mapper';
import { GetAllGroupsQuery } from 'src/groups/application/queries/get-all-groups/get-all-groups.query';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, type: [GroupResponseDto] })
  async getAllGroups() {
    const groups = await this.groupService.findAll(new GetAllGroupsQuery());
    return groups.map((group) => GroupHttpMapper.toResponseDto(group));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get groups by ID' })
  @ApiResponse({ status: 200, type: GroupResponseDto })
  async getGroupById(@Param('id', ParseUUIDPipe) id: string) {
    const group = await this.groupService.findById(new GetGroupByIdQuery(id));
    return GroupHttpMapper.toResponseDto(group);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new groups' })
  @ApiResponse({ status: 201, type: GroupResponseDto })
  async create(@Body() createDto: CreateGroupDto) {
    const group = await this.groupService.create(
      new CreateGroupCommand(createDto),
    );
    return GroupHttpMapper.toResponseDto(group);
  }

  @Put()
  @ApiOperation({ summary: 'Update a groups' })
  @ApiResponse({ status: 200, type: GroupResponseDto })
  async update(@Body() updateDto: UpdateGroupDto) {
    const group = await this.groupService.update(
      new UpdateGroupCommand(updateDto.id, updateDto),
    );
    return GroupHttpMapper.toResponseDto(group);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a groups' })
  @ApiResponse({ status: 200, type: GroupResponseDto })
  async delete(@Body() deleteDto: DeleteGroupDto) {
    const group = await this.groupService.delete(
      new DeleteGroupCommand(deleteDto.id),
    );
    return GroupHttpMapper.toResponseDto(group);
  }
}
