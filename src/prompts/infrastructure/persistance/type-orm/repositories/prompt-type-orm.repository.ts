import { Injectable, Logger } from '@nestjs/common';
import { PromptTypeOrmEntity } from '../entities/prompt-type-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmPromptsMapper } from '../mapper/prompt-type-orm.mapper';
import { PromptRepository } from 'src/prompts/application/ports/prompt.repository';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

@Injectable()
export class PromptTypeOrmRepository implements PromptRepository {
  private readonly logger = new Logger(PromptTypeOrmRepository.name);
  constructor(
    @InjectRepository(PromptTypeOrmEntity)
    private readonly repository: Repository<PromptTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Prompt[]> {
    this.logger.debug('Finding all prompts');
    const entities = await this.repository.find();
    return entities.map(TypeOrmPromptsMapper.toDomain);
  }
  async findById(id: string): Promise<Prompt> {
    this.logger.debug(`Finding prompt by id: ${id}`);
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? TypeOrmPromptsMapper.toDomain(entity) : null;
  }
  async findByParentId(parentId: string): Promise<Prompt[]> {
    this.logger.debug(`Finding prompts by parent id: ${parentId}`);
    const entities = await this.repository.find({ where: { parentId } });
    return entities.map(TypeOrmPromptsMapper.toDomain);
  }

  async create(domain: Prompt): Promise<Prompt> {
    this.logger.debug(`Saving prompt: ${domain.id}`);
    const entity = TypeOrmPromptsMapper.toPersistence(domain);
    const saved = await this.repository.save(entity);
    return TypeOrmPromptsMapper.toDomain(saved);
  }
  async update(domain: Prompt): Promise<Prompt> {
    this.logger.debug(`Updating prompt: ${domain.id}`);
    const entity = TypeOrmPromptsMapper.toPersistence(domain);
    const updated = await this.repository.save(entity);
    return TypeOrmPromptsMapper.toDomain(updated);
  }
  async delete(id: string): Promise<Prompt> {
    this.logger.debug(`Deleting prompt: ${id}`);
    const entity = await this.repository.findOne({ where: { id } });
    await this.repository.delete(id);
    return entity ? TypeOrmPromptsMapper.toDomain(entity) : null;
  }
}
