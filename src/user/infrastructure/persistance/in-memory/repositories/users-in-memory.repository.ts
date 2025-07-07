import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/application/ports/user.repository';
import { User } from 'src/user/domain/entities/user.entity';
import { UsersInMemoryMapper } from '../mapper/users-in-memory.mapper';
import { UserInMemoryEntity } from '../entities/user-in-memory.entity';

@Injectable()
export class UsersInMemoryRepository implements UserRepository {
  private readonly logger = new Logger(UsersInMemoryRepository.name);
  private users: Map<string, UserInMemoryEntity> = new Map<
    string,
    UserInMemoryEntity
  >();

  async findAll(): Promise<User[]> {
    const entities = Array.from(this.users.values());
    return entities.map((entity) => UsersInMemoryMapper.toDomain(entity));
  }

  public async findById(id: string): Promise<User> {
    this.logger.debug(`Finding user with id: ${id}`);
    const entity = this.users.get(id);
    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return UsersInMemoryMapper.toDomain(entity);
  }

  public async create(user: User): Promise<User> {
    this.logger.debug(`Creating user: ${JSON.stringify(user)}`);
    const entity = UsersInMemoryMapper.toPersistence(user);
    this.users.set(user.id, entity);
    return user;
  }
  public async update(user: User): Promise<User> {
    this.logger.debug(`Updating user: ${JSON.stringify(user)}`);
    const entity = UsersInMemoryMapper.toPersistence(user);
    this.users.set(user.id, entity);
    return user;
  }
  public async delete(id: string): Promise<User> {
    this.logger.debug(`Deleting user with id: ${id}`);
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.delete(id);
    return UsersInMemoryMapper.toDomain(user);
  }
}
