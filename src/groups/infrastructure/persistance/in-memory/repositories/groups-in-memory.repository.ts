import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GroupRepository } from 'src/groups/application/ports/group.repository';
import { Group } from 'src/groups/domain/group';
import { GroupsInMemoryMapper } from '../mapper/groups-in-memory.mapper';
import { GroupsInMemoryEntity } from '../entities/groups-in-memory.entity';

@Injectable()
export class GroupInMemoryRepository implements GroupRepository {
  private readonly logger = new Logger(GroupInMemoryRepository.name);
  private items: Map<string, GroupsInMemoryEntity> = new Map();

  async findAll(): Promise<Group[]> {
    const entities = Array.from(this.items.values());
    return entities.map(GroupsInMemoryMapper.toDomain);
  }
  async findById(id: string): Promise<Group> {
    this.logger.debug(`Finding group by id: ${id}`);
    const entity = this.items.get(id);
    if (!entity) throw new NotFoundException();
    return GroupsInMemoryMapper.toDomain(entity);
  }
  async create(domain: Group): Promise<Group> {
    this.logger.debug(`Saving group: ${domain.id}`);
    const entity = GroupsInMemoryMapper.toPersistence(domain);
    this.items.set(domain.id, entity);
    return domain;
  }
  async update(domain: Group): Promise<Group> {
    this.logger.debug(`Updating group: ${domain.id}`);
    const entity = GroupsInMemoryMapper.toPersistence(domain);
    this.items.set(domain.id, entity);
    return domain;
  }
  async delete(id: string): Promise<Group> {
    this.logger.debug(`Deleting group: ${id}`);
    const entity = this.items.get(id);
    if (!entity) throw new NotFoundException();
    this.items.delete(id);
    return GroupsInMemoryMapper.toDomain(entity);
  }
}
