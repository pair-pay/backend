import { MembershipInMemoryRepository } from './membership-in-memory.repository';
import { MembershipInMemoryMapper } from '../mapper/membership-in-memory.mapper';
import { MembershipInMemoryEntity } from '../entities/membership-in-memory.entity';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { NotFoundException } from '@nestjs/common';

jest.mock('../mapper/membership-in-memory.mapper');

const mockMembership: Membership = {
  id: '1',
  groupId: 'g1',
  userId: 'u1',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-02T00:00:00.000Z'),
} as Membership;

const mockEntity: MembershipInMemoryEntity = {
  id: '1',
  groupId: 'g1',
  userId: 'u1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
};

describe('MembershipInMemoryRepository', () => {
  let repository: MembershipInMemoryRepository;

  beforeEach(() => {
    repository = new MembershipInMemoryRepository();
    jest.clearAllMocks();
  });

  it('should create and find membership', async () => {
    (MembershipInMemoryMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    (MembershipInMemoryMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    await repository.create(mockMembership);
    const found = await repository.findById('1');
    expect(found).toBe(mockMembership);
  });

  it('should throw NotFoundException if not found', async () => {
    await expect(repository.findById('not-exist')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should update membership', async () => {
    (MembershipInMemoryMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    (MembershipInMemoryMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    await repository.create(mockMembership);
    const updated = await repository.update(mockMembership);
    expect(updated).toBe(mockMembership);
  });

  it('should delete membership', async () => {
    (MembershipInMemoryMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    (MembershipInMemoryMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    await repository.create(mockMembership);
    const deleted = await repository.delete('1');
    expect(deleted).toBe(mockMembership);
    await expect(repository.findById('1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should find all memberships', async () => {
    (MembershipInMemoryMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    (MembershipInMemoryMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    await repository.create(mockMembership);
    const all = await repository.findAll();
    expect(all).toEqual([mockMembership]);
  });

  it('should find by groupId', async () => {
    (MembershipInMemoryMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    (MembershipInMemoryMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    await repository.create(mockMembership);
    const byGroup = await repository.findByGroupId('g1');
    expect(byGroup).toEqual([mockMembership]);
  });

  it('should find by userId', async () => {
    (MembershipInMemoryMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    (MembershipInMemoryMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    await repository.create(mockMembership);
    const byUser = await repository.findByUserId('u1');
    expect(byUser).toEqual([mockMembership]);
  });
});
