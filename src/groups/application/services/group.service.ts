import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Group } from '../../domain/group';
import { GetAllGroupsQuery } from '../queries/get-all-groups/get-all-groups.query';
import { GetGroupByIdQuery } from '../queries/get-group-by-id/get-group-by-id.query';
import { CreateGroupCommand } from '../commands/create-group.command';
import { UpdateGroupCommand } from '../commands/update-group.command';
import { DeleteGroupCommand } from '../commands/delete-group.command';
import { ResponseGroupDto } from '../dtos/response-group.dto';

@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findAll(
    getAllGroupsQuery: GetAllGroupsQuery,
  ): Promise<ResponseGroupDto[]> {
    return this.queryBus.execute(getAllGroupsQuery);
  }

  async findById(
    getGroupByIdQuery: GetGroupByIdQuery,
  ): Promise<ResponseGroupDto> {
    return this.queryBus.execute(getGroupByIdQuery);
  }

  async create(
    createGroupCommand: CreateGroupCommand,
  ): Promise<ResponseGroupDto> {
    return this.commandBus.execute(createGroupCommand);
  }

  async update(
    updateGroupCommand: UpdateGroupCommand,
  ): Promise<ResponseGroupDto> {
    return this.commandBus.execute(updateGroupCommand);
  }

  async delete(
    deleteGroupCommand: DeleteGroupCommand,
  ): Promise<ResponseGroupDto> {
    return this.commandBus.execute(deleteGroupCommand);
  }
}
