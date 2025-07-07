import { ResponseGroupDto } from 'src/groups/application/dtos/response-group.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';

export class ResponseMembershipDto {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly group?: ResponseGroupDto[],
    public readonly user?: ResponseUserDto[],
  ) {}
}
