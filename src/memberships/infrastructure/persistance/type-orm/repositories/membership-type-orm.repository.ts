import { Injectable, Logger } from '@nestjs/common';
import { MembershipTypeOrmEntity } from '../entities/membership-type-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmMembershipsMapper } from '../mapper/membership-type-orm.mapper';
import { MembershipRepository } from 'src/memberships/application/ports/membership.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

@Injectable()
export class MembershipTypeOrmRepository implements MembershipRepository {
  private readonly logger = new Logger(MembershipTypeOrmRepository.name);
  constructor(
    @InjectRepository(MembershipTypeOrmEntity)
    private readonly repository: Repository<MembershipTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Membership[]> {
    this.logger.debug('Finding all groups');
    const entities = await this.repository.find();
    return entities.map(TypeOrmMembershipsMapper.toDomain);
  }
  async findById(id: string): Promise<Membership> {
    this.logger.debug(`Finding membership by id: ${id}`);
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? TypeOrmMembershipsMapper.toDomain(entity) : null;
  }

  public async findByGroupId(groupId: string): Promise<Membership[]> {
    this.logger.debug(`Finding memberships by group id: ${groupId}`);
    const entities = await this.repository.find({ where: { groupId } });
    return entities.map(TypeOrmMembershipsMapper.toDomain);
  }
  public async findByUserId(userId: string): Promise<Membership[]> {
    this.logger.debug(`Finding memberships by user id: ${userId}`);
    const entities = await this.repository.find({ where: { userId } });
    return entities.map(TypeOrmMembershipsMapper.toDomain);
  }
  public async findByGroupIdAndUserId(
    groupId: string,
    userId: string,
  ): Promise<Membership> {
    this.logger.debug(
      `Finding membership by group id: ${groupId} and user id: ${userId}`,
    );
    const entity = await this.repository.findOne({
      where: { groupId, userId },
    });
    return entity ? TypeOrmMembershipsMapper.toDomain(entity) : null;
  }

  async create(domain: Membership): Promise<Membership> {
    this.logger.debug(`Saving group: ${domain.id}`);
    const entity = TypeOrmMembershipsMapper.toPersistence(domain);
    const saved = await this.repository.save(entity);
    return TypeOrmMembershipsMapper.toDomain(saved);
  }
  async update(domain: Membership): Promise<Membership> {
    this.logger.debug(`Updating group: ${domain.id}`);
    const entity = TypeOrmMembershipsMapper.toPersistence(domain);
    const updated = await this.repository.save(entity);
    return TypeOrmMembershipsMapper.toDomain(updated);
  }
  async delete(id: string): Promise<Membership> {
    this.logger.debug(`Deleting group: ${id}`);
    const entity = await this.repository.findOne({ where: { id } });
    await this.repository.delete(id);
    return entity ? TypeOrmMembershipsMapper.toDomain(entity) : null;
  }
}
