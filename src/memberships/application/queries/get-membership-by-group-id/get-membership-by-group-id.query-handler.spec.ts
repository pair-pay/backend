import { GetMembershipByGroupIdQueryHandler } from './get-membership-by-group-id.query-handler';
import { MembershipRepository } from '../../ports/membership.repository';
import { GetMembershipByGroupIdQuery } from './get-membership-by-group-id.query';
import { Membership } from '../../../domain/entities/membership.entity';

describe('GetMembershipByGroupIdQueryHandler', () => {
  let handler: GetMembershipByGroupIdQueryHandler;
  let membershipRepository: jest.Mocked<MembershipRepository>;

  beforeEach(() => {
    membershipRepository = {
      findByGroupId: jest.fn(),
    } as any;
    handler = new GetMembershipByGroupIdQueryHandler(membershipRepository);
  });

  it('should return memberships from the repository by groupId', async () => {
    const memberships = [{ id: 'm1' } as Membership];
    membershipRepository.findByGroupId.mockResolvedValueOnce(memberships);
    const query = { groupId: 'g1' } as GetMembershipByGroupIdQuery;
    const result = await handler.execute(query);
    expect(membershipRepository.findByGroupId).toHaveBeenCalledWith('g1');
    expect(result).toBe(memberships);
  });
});
