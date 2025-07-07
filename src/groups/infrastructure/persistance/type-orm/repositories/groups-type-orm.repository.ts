import { Injectable, Logger } from '@nestjs/common';
import { GroupsTypeOrmEntity } from '../entities/groups-type-orm.entity';
import { GroupRepository } from 'src/groups/application/ports/group.repository';
import { Group } from 'src/groups/domain/group';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmGroupsMapper } from '../mapper/groups-type-orm.mapper';

@Injectable()
export class GroupTypeOrmRepository implements GroupRepository {
  private readonly logger = new Logger(GroupTypeOrmRepository.name);
  constructor(
    @InjectRepository(GroupsTypeOrmEntity)
    private readonly repo: Repository<GroupsTypeOrmEntity>,
  ) {}
  async findAll(): Promise<Group[]> {
    this.logger.debug('Finding all groups');
    const entities = await this.repo.find();
    return entities.map(TypeOrmGroupsMapper.toDomain);
  }
  async findById(id: string): Promise<Group> {
    this.logger.debug(`Finding group by id: ${id}`);
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? TypeOrmGroupsMapper.toDomain(entity) : null;
  }
  async create(domain: Group): Promise<Group> {
    this.logger.debug(`Saving group: ${domain.id}`);
    const entity = TypeOrmGroupsMapper.toPersistence(domain);
    const saved = await this.repo.save(entity);
    return TypeOrmGroupsMapper.toDomain(saved);
  }
  async update(domain: Group): Promise<Group> {
    this.logger.debug(`Updating group: ${domain.id}`);
    const entity = TypeOrmGroupsMapper.toPersistence(domain);
    const updated = await this.repo.save(entity);
    return TypeOrmGroupsMapper.toDomain(updated);
  }
  async delete(id: string): Promise<Group> {
    this.logger.debug(`Deleting group: ${id}`);
    const entity = await this.repo.findOne({ where: { id } });
    await this.repo.delete(id);
    return entity ? TypeOrmGroupsMapper.toDomain(entity) : null;
  }
}
