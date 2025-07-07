import { MembershipTypeOrmRepository } from './membership-type-orm.repository';
import { MembershipTypeOrmEntity } from '../entities/membership-type-orm.entity';
import { TypeOrmMembershipsMapper } from '../mapper/membership-type-orm.mapper';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

jest.mock('../mapper/membership-type-orm.mapper');

const mockMembership: Membership = {
  id: '1',
  groupId: 'g1',
  userId: 'u1',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-02T00:00:00.000Z'),
} as Membership;

const mockEntity: MembershipTypeOrmEntity = {
  id: '1',
  groupId: 'g1',
  userId: 'u1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
} as MembershipTypeOrmEntity;

describe('MembershipTypeOrmRepository', () => {
  let repository: MembershipTypeOrmRepository;
  let repoMock: any;

  beforeEach(() => {
    repoMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };
    repository = new MembershipTypeOrmRepository(repoMock);
    jest.clearAllMocks();
  });

  it('should find all memberships', async () => {
    repoMock.find.mockResolvedValue([mockEntity]);
    (TypeOrmMembershipsMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    const result = await repository.findAll();
    expect(result).toEqual([mockMembership]);
  });

  it('should find by id', async () => {
    repoMock.findOne.mockResolvedValue(mockEntity);
    (TypeOrmMembershipsMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    const result = await repository.findById('1');
    expect(result).toBe(mockMembership);
  });

  it('should return null if not found by id', async () => {
    repoMock.findOne.mockResolvedValue(null);
    const result = await repository.findById('not-exist');
    expect(result).toBeNull();
  });

  it('should find by groupId', async () => {
    repoMock.find.mockResolvedValue([mockEntity]);
    (TypeOrmMembershipsMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    const result = await repository.findByGroupId('g1');
    expect(result).toEqual([mockMembership]);
  });

  it('should find by userId', async () => {
    repoMock.find.mockResolvedValue([mockEntity]);
    (TypeOrmMembershipsMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    const result = await repository.findByUserId('u1');
    expect(result).toEqual([mockMembership]);
  });

  it('should find by groupId and userId', async () => {
    repoMock.findOne.mockResolvedValue(mockEntity);
    (TypeOrmMembershipsMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    const result = await repository.findByGroupIdAndUserId('g1', 'u1');
    expect(result).toBe(mockMembership);
  });

  it('should return null if not found by groupId and userId', async () => {
    repoMock.findOne.mockResolvedValue(null);
    const result = await repository.findByGroupIdAndUserId('g1', 'u1');
    expect(result).toBeNull();
  });

  it('should create membership', async () => {
    (TypeOrmMembershipsMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    repoMock.save.mockResolvedValue(mockEntity);
    (TypeOrmMembershipsMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    const result = await repository.create(mockMembership);
    expect(result).toBe(mockMembership);
  });

  it('should update membership', async () => {
    (TypeOrmMembershipsMapper.toPersistence as jest.Mock).mockReturnValue(
      mockEntity,
    );
    repoMock.save.mockResolvedValue(mockEntity);
    (TypeOrmMembershipsMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    const result = await repository.update(mockMembership);
    expect(result).toBe(mockMembership);
  });

  it('should delete membership', async () => {
    repoMock.findOne.mockResolvedValue(mockEntity);
    (TypeOrmMembershipsMapper.toDomain as jest.Mock).mockReturnValue(
      mockMembership,
    );
    repoMock.delete.mockResolvedValue({});
    const result = await repository.delete('1');
    expect(result).toBe(mockMembership);
  });

  it('should return null when deleting non-existent membership', async () => {
    repoMock.findOne.mockResolvedValue(null);
    repoMock.delete.mockResolvedValue({});
    const result = await repository.delete('not-exist');
    expect(result).toBeNull();
  });
});
