import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PromptInMemoryMapper } from '../mapper/prompt-in-memory.mapper';
import { PromptInMemoryEntity } from '../entities/prompt-in-memory.entity';
import { PromptRepository } from 'src/prompts/application/ports/prompt.repository';
import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

@Injectable()
export class PromptInMemoryRepository implements PromptRepository {
  private readonly logger = new Logger(PromptInMemoryRepository.name);
  private items: Map<string, PromptInMemoryEntity> = new Map();

  async findAll(): Promise<Prompt[]> {
    const entities = Array.from(this.items.values());
    return entities.map(PromptInMemoryMapper.toDomain);
  }
  async findById(id: string): Promise<Prompt> {
    this.logger.debug(`Finding prompt by id: ${id}`);
    const entity = this.items.get(id);
    if (!entity) throw new NotFoundException();
    return PromptInMemoryMapper.toDomain(entity);
  }

  async findByParentId(parentId: string): Promise<Prompt[]> {
    const entities = Array.from(this.items.values()).filter(
      (entity) => entity.parentId === parentId,
    );
    return entities.map(PromptInMemoryMapper.toDomain);
  }
  async create(domain: Prompt): Promise<Prompt> {
    this.logger.debug(`Saving prompt: ${domain.id}`);
    const entity = PromptInMemoryMapper.toPersistence(domain);
    this.items.set(domain.id, entity);
    return domain;
  }

  async update(domain: Prompt): Promise<Prompt> {
    this.logger.debug(`Updating prompt: ${domain.id}`);
    const entity = PromptInMemoryMapper.toPersistence(domain);
    this.items.set(domain.id, entity);
    return domain;
  }
  async delete(id: string): Promise<Prompt> {
    this.logger.debug(`Deleting prompt: ${id}`);
    const entity = this.items.get(id);
    if (!entity) throw new NotFoundException();
    this.items.delete(id);
    return PromptInMemoryMapper.toDomain(entity);
  }
}
