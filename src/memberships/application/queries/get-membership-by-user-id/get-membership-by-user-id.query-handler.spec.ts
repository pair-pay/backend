import { GetMembershipByUserIdQueryHandler } from './get-membership-by-user-id.query-handler';
import { MembershipRepository } from '../../ports/membership.repository';
import { GetMembershipByUserIdQuery } from './get-membership-by-user-id.query';
import { Membership } from '../../../domain/entities/membership.entity';

describe('GetMembershipByUserIdQueryHandler', () => {
  let handler: GetMembershipByUserIdQueryHandler;
  let membershipRepository: jest.Mocked<MembershipRepository>;

  beforeEach(() => {
    membershipRepository = {
      findByUserId: jest.fn(),
    } as any;
    handler = new GetMembershipByUserIdQueryHandler(membershipRepository);
  });

  it('should return memberships from the repository by userId', async () => {
    const memberships = [{ id: 'm1' } as Membership];
    membershipRepository.findByUserId.mockResolvedValueOnce(memberships);
    const query = { userId: 'u1' } as GetMembershipByUserIdQuery;
    const result = await handler.execute(query);
    expect(membershipRepository.findByUserId).toHaveBeenCalledWith('u1');
    expect(result).toBe(memberships);
  });
});
