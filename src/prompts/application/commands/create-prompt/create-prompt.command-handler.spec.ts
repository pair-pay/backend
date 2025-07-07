import { CreateMembershipCommandHandler } from './create-prompt.command-handler';
import { CreateMembershipCommand } from './create-prompt.command';
import { MembershipRepository } from '../../ports/prompt.repository';
import { MembershipFactory } from '../../../domain/factories/prompt.factory';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { MembershipAlreadyExistsException } from '../../../domain/exceptions/member-already-exists.exception';
import { Membership } from '../../../domain/entities/prompt.entity';

describe('CreateMembershipCommandHandler', () => {
  let handler: CreateMembershipCommandHandler;
  let membershipRepository: jest.Mocked<MembershipRepository>;
  let membershipFactory: jest.Mocked<MembershipFactory>;
  let eventBus: EventBus;
  let queryBus: jest.Mocked<QueryBus>;

  beforeEach(() => {
    membershipRepository = {
      findByGroupIdAndUserId: jest.fn(),
      create: jest.fn(),
    } as any;
    membershipFactory = {
      create: jest.fn(),
    } as any;
    eventBus = {} as EventBus;
    queryBus = { execute: jest.fn() } as any;
    handler = new CreateMembershipCommandHandler(
      membershipRepository,
      membershipFactory,
      eventBus,
      queryBus,
    );
  });

  it('should throw NotFoundException if user does not exist', async () => {
    queryBus.execute.mockResolvedValueOnce(null); // user
    const command = {
      userId: 'user-1',
      groupId: 'group-1',
    } as CreateMembershipCommand;
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if group does not exist', async () => {
    queryBus.execute.mockResolvedValueOnce({}); // user exists
    queryBus.execute.mockResolvedValueOnce(null); // group
    const command = {
      userId: 'user-1',
      groupId: 'group-1',
    } as CreateMembershipCommand;
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should throw MembershipAlreadyExistsException if membership exists', async () => {
    queryBus.execute.mockResolvedValueOnce({}); // user exists
    queryBus.execute.mockResolvedValueOnce({}); // group exists
    membershipRepository.findByGroupIdAndUserId.mockResolvedValueOnce(
      {} as Membership,
    );
    const command = {
      userId: 'user-1',
      groupId: 'group-1',
    } as CreateMembershipCommand;
    await expect(handler.execute(command)).rejects.toThrow(
      MembershipAlreadyExistsException,
    );
  });

  it('should create and return membership if all is valid', async () => {
    queryBus.execute.mockResolvedValueOnce({}); // user exists
    queryBus.execute.mockResolvedValueOnce({}); // group exists
    membershipRepository.findByGroupIdAndUserId.mockResolvedValueOnce(null);
    const fakeMembership = { id: 'm1' } as Membership;
    membershipFactory.create.mockReturnValueOnce(fakeMembership);
    membershipRepository.create.mockResolvedValueOnce(fakeMembership);
    const command = {
      userId: 'user-1',
      groupId: 'group-1',
    } as CreateMembershipCommand;
    const result = await handler.execute(command);
    expect(membershipFactory.create).toHaveBeenCalledWith({
      groupId: 'group-1',
      userId: 'user-1',
    });
    expect(membershipRepository.create).toHaveBeenCalledWith(fakeMembership);
    expect(result).toBe(fakeMembership);
  });
});
