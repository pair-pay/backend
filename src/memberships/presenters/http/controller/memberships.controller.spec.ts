import { Test, TestingModule } from '@nestjs/testing';
import { MembershipsController } from './memberships.controller';
import { MembershipService } from '../../../application/services/membership.service';
import { MembershipHttpMapper } from '../mapper/membership-http.mapper';
import { UserHttpMapper } from 'src/user/presenters/http/mapper/user-http.mapper';

describe('MembershipsController', () => {
  let controller: MembershipsController;
  let service: jest.Mocked<MembershipService>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      findByGroupId: jest.fn(),
      findByGroupIdAndUserId: jest.fn(),
      findUsersByGroupId: jest.fn(),
      createMembership: jest.fn(),
      deleteMembership: jest.fn(),
    } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipsController],
      providers: [{ provide: MembershipService, useValue: service }],
    }).compile();
    controller = module.get<MembershipsController>(MembershipsController);
  });

  it('should return mapped memberships for getAllMemberships', async () => {
    const memberships = [{ id: 'm1' }];
    const mapped = [
      {
        id: 'm1',
        mapped: true,
        groupId: 'g1',
        userId: 'u1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      },
    ];
    service.findAll.mockResolvedValueOnce(memberships as any);
    jest
      .spyOn(MembershipHttpMapper, 'toResponseDto')
      .mockImplementation((m) => ({ ...mapped[0] }));
    const result = await controller.getAllMemberships();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  it('should return mapped membership for getMembershipById', async () => {
    const membership = { id: 'm1' };
    const mapped = {
      id: 'm1',
      mapped: true,
      groupId: 'g1',
      userId: 'u1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    };
    service.findById.mockResolvedValueOnce(membership as any);
    jest
      .spyOn(MembershipHttpMapper, 'toResponseDto')
      .mockImplementation(() => mapped);
    const result = await controller.getMembershipById('m1');
    expect(service.findById).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  it('should return mapped memberships for getMembershipsByUserId', async () => {
    const memberships = [{ id: 'm1' }];
    const mapped = [
      {
        id: 'm1',
        mapped: true,
        groupId: 'g1',
        userId: 'u1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      },
    ];
    service.findByUserId.mockResolvedValueOnce(memberships as any);
    jest
      .spyOn(MembershipHttpMapper, 'toResponseDto')
      .mockImplementation((m) => ({ ...mapped[0] }));
    const result = await controller.getMembershipsByUserId('u1');
    expect(service.findByUserId).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  it('should return mapped memberships for getMembershipsByGroupId', async () => {
    const memberships = [{ id: 'm1' }];
    const mapped = [
      {
        id: 'm1',
        mapped: true,
        groupId: 'g1',
        userId: 'u1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      },
    ];
    service.findByGroupId.mockResolvedValueOnce(memberships as any);
    jest
      .spyOn(MembershipHttpMapper, 'toResponseDto')
      .mockImplementation((m) => ({ ...mapped[0] }));
    const result = await controller.getMembershipsByGroupId('g1');
    expect(service.findByGroupId).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  it('should return mapped membership for getMembershipsByGroupIdAndUserId', async () => {
    const membership = { id: 'm1' };
    const mapped = {
      id: 'm1',
      mapped: true,
      groupId: 'g1',
      userId: 'u1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    };
    service.findByGroupIdAndUserId.mockResolvedValueOnce(membership as any);
    jest
      .spyOn(MembershipHttpMapper, 'toResponseDto')
      .mockImplementation(() => mapped);
    const result = await controller.getMembershipsByGroupIdAndUserId(
      'g1',
      'u1',
    );
    expect(service.findByGroupIdAndUserId).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  it('should return mapped users for getUsersByGroupId', async () => {
    const users = [
      {
        id: 'u1',
        name: 'User 1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      },
    ];
    const mapped = [
      {
        id: 'u1',
        name: 'User 1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
        mapped: true,
      },
    ];
    service.findUsersByGroupId.mockResolvedValueOnce(users as any);
    jest
      .spyOn(UserHttpMapper, 'toResponseDto')
      .mockImplementation((u) => ({ ...mapped[0] }));
    const result = await controller.getUsersByGroupId('g1');
    expect(service.findUsersByGroupId).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  it('should return mapped membership for createMembership', async () => {
    const membership = { id: 'm1' };
    const mapped = {
      id: 'm1',
      mapped: true,
      groupId: 'g1',
      userId: 'u1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    };
    service.createMembership.mockResolvedValueOnce(membership as any);
    jest
      .spyOn(MembershipHttpMapper, 'toResponseDto')
      .mockImplementation(() => mapped);
    const dto = { groupId: 'g1', userId: 'u1' };
    const result = await controller.createMembership(dto as any);
    expect(service.createMembership).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  it('should return mapped membership for deleteMembership', async () => {
    const membership = { id: 'm1' };
    const mapped = {
      id: 'm1',
      mapped: true,
      groupId: 'g1',
      userId: 'u1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    };
    service.deleteMembership.mockResolvedValueOnce(membership as any);
    jest
      .spyOn(MembershipHttpMapper, 'toResponseDto')
      .mockImplementation(() => mapped);
    const dto = { id: 'm1' };
    const result = await controller.deleteMembership(dto as any);
    expect(service.deleteMembership).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });
});
