import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthInMemoryEntity } from '../entities/auth-in-memory.entity';
import { AuthRepository } from 'src/auth/application/ports/auth.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { AuthInMemoryMapper } from '../mapper/auth-in-memory.mapper';

@Injectable()
export class AuthInMemoryRepository implements AuthRepository {
  private readonly logger = new Logger(AuthInMemoryRepository.name);
  private auths: Map<string, AuthInMemoryEntity> = new Map<
    string,
    AuthInMemoryEntity
  >();

  async findAll(): Promise<Auth[]> {
    this.logger.debug(`Finding all auths`);
    return Array.from(this.auths.values()).map(AuthInMemoryMapper.toDomain);
  }
  async findById(id: string): Promise<Auth> {
    this.logger.debug(`Finding auth by id: ${id}`);
    const entity = this.auths.get(id);
    return entity ? AuthInMemoryMapper.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<Auth> {
    this.logger.debug(`Finding auth by email: ${email}`);
    const entity = this.auths.get(email);
    return entity ? AuthInMemoryMapper.toDomain(entity) : null;
  }
  async create(auth: Auth): Promise<Auth> {
    this.logger.debug(`Creating auth: ${JSON.stringify(auth)}`);
    const entity = AuthInMemoryMapper.toPersistence(auth);
    this.auths.set(auth.email.value, entity);
    return auth;
  }
  async update(auth: Auth): Promise<Auth> {
    this.logger.debug(`Updating auth: ${JSON.stringify(auth)}`);
    const entity = AuthInMemoryMapper.toPersistence(auth);
    this.auths.set(auth.email.value, entity);
    return auth;
  }
  async delete(auth: Auth): Promise<Auth> {
    this.logger.debug(`Deleting auth: ${JSON.stringify(auth)}`);
    const entity = this.auths.get(auth.email.value);
    if (!entity) {
      return null;
    }
    this.auths.delete(auth.email.value);
    return auth;
  }
  /**
   * Finds an Auth aggregate by its refresh token.
   * @param refreshToken The refresh token string
   * @returns Promise<Auth | null> The Auth aggregate or null if not found
   */
  async findByRefreshToken(refreshToken: string): Promise<Auth | null> {
    this.logger.debug(`Finding auth by refresh token: ${refreshToken}`);
    for (const entity of this.auths.values()) {
      if (entity.refreshToken === refreshToken) {
        return AuthInMemoryMapper.toDomain(entity);
      }
    }
    return null;
  }
}
