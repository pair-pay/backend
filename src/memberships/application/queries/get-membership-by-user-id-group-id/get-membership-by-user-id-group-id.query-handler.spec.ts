import { GetMembershipByUserIdGroupIdQueryHandler } from './get-membership-by-user-id-group-id.query-handler';
import { MembershipRepository } from '../../ports/membership.repository';
import { GetMembershipByUserIdGroupIdQuery } from './get-membership-by-user-id-group-id.query';
import { Membership } from '../../../domain/entities/membership.entity';

describe('GetMembershipByUserIdGroupIdQueryHandler', () => {
  let handler: GetMembershipByUserIdGroupIdQueryHandler;
  let membershipRepository: jest.Mocked<MembershipRepository>;

  beforeEach(() => {
    membershipRepository = {
      findByGroupIdAndUserId: jest.fn(),
    } as any;
    handler = new GetMembershipByUserIdGroupIdQueryHandler(
      membershipRepository,
    );
  });

  it('should return membership from the repository by groupId and userId', async () => {
    const membership = { id: 'm1' } as Membership;
    membershipRepository.findByGroupIdAndUserId.mockResolvedValueOnce(
      membership,
    );
    const query = {
      groupId: 'g1',
      userId: 'u1',
    } as GetMembershipByUserIdGroupIdQuery;
    const result = await handler.execute(query);
    expect(membershipRepository.findByGroupIdAndUserId).toHaveBeenCalledWith(
      'g1',
      'u1',
    );
    expect(result).toBe(membership);
  });
});
