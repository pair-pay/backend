import { UserHttpMapper } from 'src/user/presenters/http/mapper/user-http.mapper';
import { Group } from '../../../domain/group';
import { GroupResponseDto } from '../dto/group-response.dto';
import { ResponseGroupDto } from 'src/groups/application/dtos/response-group.dto';

export class GroupHttpMapper {
  static toResponseDto(group: ResponseGroupDto): GroupResponseDto {
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      createdAt: group.createdAt.toISOString(),
      updatedAt: group.updatedAt.toISOString(),
      users: group.users?.map((user) => UserHttpMapper.toResponseDto(user)),
    };
  }
}
