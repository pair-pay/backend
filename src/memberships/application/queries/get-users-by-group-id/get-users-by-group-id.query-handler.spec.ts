import { GetUsersByGroupIdQueryHandler } from './get-users-by-group-id.query-handler';
import { MembershipRepository } from '../../ports/membership.repository';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersByGroupIdQuery } from './get-users-by-group-id.query';
import { User } from '../../../../user/domain/entities/user.entity';
import { NameValueObject } from '../../../../user/domain/value-objects/name.value-object';

describe('GetUsersByGroupIdQueryHandler', () => {
  let handler: GetUsersByGroupIdQueryHandler;
  let membershipRepository: jest.Mocked<MembershipRepository>;
  let queryBus: jest.Mocked<QueryBus>;

  beforeEach(() => {
    membershipRepository = {
      findByGroupId: jest.fn(),
    } as any;
    queryBus = { execute: jest.fn() } as any;
    handler = new GetUsersByGroupIdQueryHandler(membershipRepository, queryBus);
  });

  it('should return users for each membership in the group', async () => {
    const memberships = [{ userId: 'u1' }, { userId: 'u2' }];
    const users = [
      new User(
        'u1',
        new NameValueObject('User 1'),
        new Date('2023-01-01'),
        new Date('2023-01-02'),
      ),
      new User(
        'u2',
        new NameValueObject('User 2'),
        new Date('2023-01-01'),
        new Date('2023-01-02'),
      ),
    ];
    membershipRepository.findByGroupId.mockResolvedValueOnce(
      memberships as any,
    );
    queryBus.execute
      .mockResolvedValueOnce(users[0])
      .mockResolvedValueOnce(users[1]);
    const query = { groupId: 'g1' } as GetUsersByGroupIdQuery;
    const result = await handler.execute(query);
    expect(membershipRepository.findByGroupId).toHaveBeenCalledWith('g1');
    expect(queryBus.execute).toHaveBeenCalledTimes(2);
    expect(result).toEqual(users);
  });
});
