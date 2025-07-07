import { GetAllMembershipsQueryHandler } from './get-all-memberships.query-handler';
import { MembershipRepository } from '../../ports/membership.repository';
import { Membership } from '../../../domain/entities/membership.entity';

describe('GetAllMembershipsQueryHandler', () => {
  let handler: GetAllMembershipsQueryHandler;
  let membershipRepository: jest.Mocked<MembershipRepository>;

  beforeEach(() => {
    membershipRepository = {
      findAll: jest.fn(),
    } as any;
    handler = new GetAllMembershipsQueryHandler(membershipRepository);
  });

  it('should return all memberships from the repository', async () => {
    const memberships = [{ id: 'm1' } as Membership];
    membershipRepository.findAll.mockResolvedValueOnce(memberships);
    const result = await handler.execute();
    expect(membershipRepository.findAll).toHaveBeenCalled();
    expect(result).toBe(memberships);
  });
});
