import { Injectable, Logger } from '@nestjs/common';
import { UserTypeOrmEntity } from '../entities/user-type-orm.entity';
import { UserRepository } from 'src/user/application/ports/user.repository';
import { User } from 'src/user/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUserMapper } from '../mapper/user-type-orm.mapper';

@Injectable()
export class TypeOrmUsersRepository implements UserRepository {
  private readonly logger = new Logger(TypeOrmUsersRepository.name);

  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  public async findAll(): Promise<User[]> {
    this.logger.debug('Finding all users');
    const users = await this.userRepository.find();
    return users.map((user) => TypeOrmUserMapper.toDomain(user));
  }
  public async findById(id: string): Promise<User> {
    this.logger.debug(`Finding user by id: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } });
    return TypeOrmUserMapper.toDomain(user);
  }

  public async create(user: User): Promise<User> {
    this.logger.debug(`Saving user: ${user}`);
    const userEntity = TypeOrmUserMapper.toPersistence(user);
    const savedUser = await this.userRepository.save(userEntity);
    return TypeOrmUserMapper.toDomain(savedUser);
  }
  public async update(user: User): Promise<User> {
    this.logger.debug(`Updating user: ${user}`);
    const userEntity = TypeOrmUserMapper.toPersistence(user);
    const updatedUser = await this.userRepository.save(userEntity);
    return TypeOrmUserMapper.toDomain(updatedUser);
  }
  public async delete(id: string): Promise<User> {
    this.logger.debug(`Deleting user by id: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.delete(user);
    return TypeOrmUserMapper.toDomain(user);
  }
}
