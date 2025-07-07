import { Membership } from '../../../domain/entities/membership.entity';
import { MembershipResponseDto } from '../dto/membership-response.dto';
import { Group } from 'src/groups/domain/group';
import { User } from 'src/user/domain/entities/user.entity';
import { GroupHttpMapper } from 'src/groups/presenters/http/mapper/group-http.mapper';
import { UserHttpMapper } from 'src/user/presenters/http/mapper/user-http.mapper';
import { ResponseMembershipDto } from 'src/memberships/application/dtos/response-membership.dto';

export class MembershipHttpMapper {
  static toResponseDto(
    membership: ResponseMembershipDto,
  ): MembershipResponseDto {
    return {
      id: membership.id,
      groups: membership.group?.map((group) =>
        GroupHttpMapper.toResponseDto(group),
      ),
      users: membership.user?.map((user) => UserHttpMapper.toResponseDto(user)),
      createdAt: membership.createdAt.toISOString(),
      updatedAt: membership.updatedAt.toISOString(),
    };
  }
}
