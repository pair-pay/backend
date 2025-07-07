import { CreateGroupsDto } from '../dtos/create-groups.dto';

export class CreateGroupCommand {
  constructor(public readonly data: CreateGroupsDto) {}
}
