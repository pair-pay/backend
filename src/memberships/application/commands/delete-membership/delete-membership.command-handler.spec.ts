import { DeleteMembershipCommandHandler } from './delete-membership.command-handler';
import { DeleteMembershipCommand } from './delete-membership.command';
import { MembershipRepository } from '../../ports/membership.repository';
import { NotFoundException } from '@nestjs/common';
import { Membership } from '../../../domain/entities/membership.entity';

describe('DeleteMembershipCommandHandler', () => {
  let handler: DeleteMembershipCommandHandler;
  let membershipRepository: jest.Mocked<MembershipRepository>;

  beforeEach(() => {
    membershipRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as any;
    handler = new DeleteMembershipCommandHandler(membershipRepository);
  });

  it('should throw NotFoundException if membership does not exist', async () => {
    membershipRepository.findById.mockResolvedValueOnce(null);
    const command = { id: 'membership-1' } as DeleteMembershipCommand;
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should delete and return membership if it exists', async () => {
    const fakeMembership = { id: 'membership-1' } as Membership;
    membershipRepository.findById.mockResolvedValueOnce(fakeMembership);
    membershipRepository.delete.mockResolvedValueOnce(fakeMembership);
    const command = { id: 'membership-1' } as DeleteMembershipCommand;
    const result = await handler.execute(command);
    expect(membershipRepository.findById).toHaveBeenCalledWith('membership-1');
    expect(membershipRepository.delete).toHaveBeenCalledWith('membership-1');
    expect(result).toBe(fakeMembership);
  });
});
