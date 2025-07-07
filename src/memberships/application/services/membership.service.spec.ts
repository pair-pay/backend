import { MembershipService } from './membership.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Membership } from '../../domain/entities/membership.entity';
import { GetAllMembershipsQuery } from '../queries/get-all-memberships/get-all-memberships.query';
import { GetMembershipByIdQuery } from '../queries/get-membership-by-id/get-membership-by-id.query';
import { CreateMembershipCommand } from '../commands/create-member/create-member.command';
import { DeleteMembershipCommand } from '../commands/delete-membership/delete-membership.command';
import { GetMembershipByUserIdQuery } from '../queries/get-membership-by-user-id/get-membership-by-user-id.query';
import { GetMembershipByUserIdGroupIdQuery } from '../queries/get-membership-by-user-id-group-id/get-membership-by-user-id-group-id.query';
import { GetMembershipByGroupIdQuery } from '../queries/get-membership-by-group-id/get-membership-by-group-id.query';
import { GetUsersByGroupIdQuery } from '../queries/get-users-by-group-id/get-users-by-group-id.query';

describe('MembershipService', () => {
  let service: MembershipService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(() => {
    commandBus = { execute: jest.fn() } as any;
    queryBus = { execute: jest.fn() } as any;
    service = new MembershipService(commandBus, queryBus);
  });

  it('should call queryBus.execute on findAll', async () => {
    const query = {} as GetAllMembershipsQuery;
    const memberships = [{} as Membership];
    (queryBus.execute as jest.Mock).mockResolvedValue(memberships);
    const result = await service.findAll(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe(memberships);
  });

  it('should call queryBus.execute on findById', async () => {
    const query = {} as GetMembershipByIdQuery;
    const membership = {} as Membership;
    (queryBus.execute as jest.Mock).mockResolvedValue(membership);
    const result = await service.findById(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe(membership);
  });

  it('should call queryBus.execute on findByGroupId', async () => {
    const query = {} as GetMembershipByGroupIdQuery;
    const memberships = [{} as Membership];
    (queryBus.execute as jest.Mock).mockResolvedValue(memberships);
    const result = await service.findByGroupId(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe(memberships);
  });

  it('should call queryBus.execute on findByUserId', async () => {
    const query = {} as GetMembershipByUserIdQuery;
    const memberships = [{} as Membership];
    (queryBus.execute as jest.Mock).mockResolvedValue(memberships);
    const result = await service.findByUserId(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe(memberships);
  });

  it('should call queryBus.execute on findByGroupIdAndUserId', async () => {
    const query = {} as GetMembershipByUserIdGroupIdQuery;
    const membership = {} as Membership;
    (queryBus.execute as jest.Mock).mockResolvedValue(membership);
    const result = await service.findByGroupIdAndUserId(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe(membership);
  });

  it('should call commandBus.execute on createMembership', async () => {
    const command = {} as CreateMembershipCommand;
    const membership = {} as Membership;
    (commandBus.execute as jest.Mock).mockResolvedValue(membership);
    const result = await service.createMembership(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe(membership);
  });

  it('should call commandBus.execute on deleteMembership', async () => {
    const command = {} as DeleteMembershipCommand;
    const membership = {} as Membership;
    (commandBus.execute as jest.Mock).mockResolvedValue(membership);
    const result = await service.deleteMembership(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe(membership);
  });

  it('should call queryBus.execute on findUsersByGroupId', async () => {
    const query = {} as GetUsersByGroupIdQuery;
    const users = [{}];
    (queryBus.execute as jest.Mock).mockResolvedValue(users);
    const result = await service.findUsersByGroupId(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe(users);
  });
});
