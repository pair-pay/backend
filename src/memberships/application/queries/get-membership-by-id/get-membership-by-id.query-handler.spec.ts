import { GetMembershipByIdQueryHandler } from './get-membership-by-id.query-handler';
import { MembershipRepository } from '../../ports/membership.repository';
import { GetMembershipByIdQuery } from './get-membership-by-id.query';
import { Membership } from '../../../domain/entities/membership.entity';

describe('GetMembershipByIdQueryHandler', () => {
  let handler: GetMembershipByIdQueryHandler;
  let membershipRepository: jest.Mocked<MembershipRepository>;

  beforeEach(() => {
    membershipRepository = {
      findById: jest.fn(),
    } as any;
    handler = new GetMembershipByIdQueryHandler(membershipRepository);
  });

  it('should return the membership from the repository by id', async () => {
    const membership = { id: 'm1' } as Membership;
    membershipRepository.findById.mockResolvedValueOnce(membership);
    const query = { id: 'm1' } as GetMembershipByIdQuery;
    const result = await handler.execute(query);
    expect(membershipRepository.findById).toHaveBeenCalledWith('m1');
    expect(result).toBe(membership);
  });
});
