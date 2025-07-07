import { UpdateGroupsDto } from '../dtos/update-groups.dto';

export class UpdateGroupCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateGroupsDto,
  ) {}
}
