import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GroupRepository } from 'src/groups/application/ports/group.repository';
import { Group } from 'src/groups/domain/group';
import { MembershipInMemoryMapper } from '../mapper/membership-in-memory.mapper';
import { MembershipInMemoryEntity } from '../entities/membership-in-memory.entity';
import { MembershipRepository } from 'src/memberships/application/ports/membership.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

@Injectable()
export class MembershipInMemoryRepository implements MembershipRepository {
  private readonly logger = new Logger(MembershipInMemoryRepository.name);
  private items: Map<string, MembershipInMemoryEntity> = new Map();

  async findAll(): Promise<Membership[]> {
    const entities = Array.from(this.items.values());
    return entities.map(MembershipInMemoryMapper.toDomain);
  }
  async findById(id: string): Promise<Membership> {
    this.logger.debug(`Finding membership by id: ${id}`);
    const entity = this.items.get(id);
    if (!entity) throw new NotFoundException();
    return MembershipInMemoryMapper.toDomain(entity);
  }

  public async findByGroupId(groupId: string): Promise<Membership[]> {
    this.logger.debug(`Finding memberships by group id: ${groupId}`);
    const entities = Array.from(this.items.values()).filter(
      (entity) => entity.groupId === groupId,
    );
    return entities.map(MembershipInMemoryMapper.toDomain);
  }
  public async findByUserId(userId: string): Promise<Membership[]> {
    this.logger.debug(`Finding memberships by user id: ${userId}`);
    const entities = Array.from(this.items.values()).filter(
      (entity) => entity.userId === userId,
    );
    return entities.map(MembershipInMemoryMapper.toDomain);
  }
  public async findByGroupIdAndUserId(
    groupId: string,
    userId: string,
  ): Promise<Membership> {
    throw new Error('Method not implemented.');
  }

  async create(domain: Membership): Promise<Membership> {
    this.logger.debug(`Saving membership: ${domain.id}`);
    const entity = MembershipInMemoryMapper.toPersistence(domain);
    this.items.set(domain.id, entity);
    return domain;
  }
  async update(domain: Membership): Promise<Membership> {
    this.logger.debug(`Updating membership: ${domain.id}`);
    const entity = MembershipInMemoryMapper.toPersistence(domain);
    this.items.set(domain.id, entity);
    return domain;
  }
  async delete(id: string): Promise<Membership> {
    this.logger.debug(`Deleting membership: ${id}`);
    const entity = this.items.get(id);
    if (!entity) throw new NotFoundException();
    this.items.delete(id);
    return MembershipInMemoryMapper.toDomain(entity);
  }
}
