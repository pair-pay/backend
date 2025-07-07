import { Auth } from 'src/auth/domain/entities/auth.entity';
import { AuthRedisCacheEntity } from '../entities/auth-cache.entity';

/**
 * Mapper class to convert between Trip domain objects and Redis cache entities
 */
export class AuthRedisCacheMapper {
  /**
   * Converts a Redis cache entity to a Trip domain object
   * @param entity The Redis cache entity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: AuthRedisCacheEntity): Auth {
    return Auth.fromPrimitives({
      ...entity,
      accessToken: undefined,
      accessTokenExpiresIn: undefined,
    });
  }

  /**
   * Converts a Trip domain object to a Redis cache entity
   * @param trip The Trip domain object to convert
   * @returns A Redis cache entity
   */
  static toPersistence(auth: Auth): AuthRedisCacheEntity {
    return auth.toPrimitives();
  }
}
