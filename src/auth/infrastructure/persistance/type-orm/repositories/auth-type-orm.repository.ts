import { Injectable, Logger } from '@nestjs/common';
import { AuthTypeOrmEntity } from '../entities/auth-type-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmAuthMapper } from '../mapper/auth-type-orm.mapper';
import { AuthRepository } from 'src/auth/application/ports/auth.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';

@Injectable()
export class TypeOrmAuthRepository implements AuthRepository {
  private readonly logger = new Logger(TypeOrmAuthRepository.name);

  constructor(
    @InjectRepository(AuthTypeOrmEntity)
    private readonly authRepository: Repository<AuthTypeOrmEntity>,
  ) {}

  public async findAll(): Promise<Auth[]> {
    this.logger.debug(`Finding all auths`);
    const auths = await this.authRepository.find();
    return auths.map(TypeOrmAuthMapper.toDomain);
  }
  public async findById(id: string): Promise<Auth> {
    this.logger.debug(`Finding auth by id: ${id}`);
    const auth = await this.authRepository.findOne({ where: { id } });
    return auth ? TypeOrmAuthMapper.toDomain(auth) : null;
  }

  public async findByEmail(email: string): Promise<Auth> {
    this.logger.debug(`Finding auth by email: ${email}`);
    const auth = await this.authRepository.findOne({ where: { email } });

    if (!auth) {
      this.logger.debug(`Auth not found for email: ${email}`);
      return null;
    }

    return TypeOrmAuthMapper.toDomain(auth);
  }

  public async create(auth: Auth): Promise<Auth> {
    this.logger.debug(`Saving auth: ${auth.email.value}`);
    const authEntity = TypeOrmAuthMapper.toPersistence(auth);
    const savedAuth = await this.authRepository.save(authEntity);
    return TypeOrmAuthMapper.toDomain(savedAuth);
  }

  public async update(auth: Auth): Promise<Auth> {
    this.logger.debug(`Updating auth: ${auth}`);
    const authEntity = TypeOrmAuthMapper.toPersistence(auth);
    const updatedAuth = await this.authRepository.save(authEntity);
    return TypeOrmAuthMapper.toDomain(updatedAuth);
  }
  public async delete(auth: Auth): Promise<Auth> {
    this.logger.debug(`Deleting auth: ${auth}`);
    await this.authRepository.delete(auth.id);
    return auth;
  }

  /**
   * Finds an Auth aggregate by its refresh token.
   * @param refreshToken The refresh token string
   * @returns Promise<Auth | null> The Auth aggregate or null if not found
   */
  public async findByRefreshToken(refreshToken: string): Promise<Auth | null> {
    this.logger.debug(`Finding auth by refresh token: ${refreshToken}`);
    const auth = await this.authRepository.findOne({ where: { refreshToken } });
    if (!auth) {
      this.logger.debug(`Auth not found for refresh token: ${refreshToken}`);
      return null;
    }
    return TypeOrmAuthMapper.toDomain(auth);
  }
}
