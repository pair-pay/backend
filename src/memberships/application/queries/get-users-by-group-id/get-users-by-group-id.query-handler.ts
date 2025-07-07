import { IQueryHandler, QueryHandler, QueryBus } from '@nestjs/cqrs';
import { GetUsersByGroupIdQuery } from './get-users-by-group-id.query';
import { MembershipRepository } from '../../ports/membership.repository';
import { User } from 'src/user/domain/entities/user.entity';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';

/**
 * QueryHandler to get all users of a group by groupId
 */
@QueryHandler(GetUsersByGroupIdQuery)
export class GetUsersByGroupIdQueryHandler
  implements IQueryHandler<GetUsersByGroupIdQuery>
{
  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Handles the query to get all users of a group by groupId
   * @param query - The query containing the groupId
   * @returns Promise containing an array of User entities
   */
  async execute(query: GetUsersByGroupIdQuery): Promise<User[]> {
    const memberships = await this.membershipRepository.findByGroupId(
      query.groupId,
    );
    const users: User[] = [];
    for (const membership of memberships) {
      const user = await this.queryBus.execute(
        new GetUserByIdQuery(membership.userId),
      );
      users.push(user);
    }
    return users;
  }
}
