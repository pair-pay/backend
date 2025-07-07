import { Auth } from 'src/auth/domain/entities/auth.entity';
import { AuthInMemoryCacheEntity } from '../entities/auth-in-memory-cache.entity';

/**
 * Mapper class to convert between Trip domain objects and in-memory cache entities
 */
export class AuthInMemoryCacheMapper {
  /**
   * Converts an in-memory cache entity to a Trip domain object
   * @param entity The in-memory cache entity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: AuthInMemoryCacheEntity): Auth {
    return Auth.fromPrimitives({
      ...entity,
      accessToken: undefined,
      accessTokenExpiresIn: undefined,
    });
  }

  /**
   * Converts a Trip domain object to an in-memory cache entity
   * @param trip The Trip domain object to convert
   * @returns An in-memory cache entity
   */
  static toPersistence(auth: Auth): AuthInMemoryCacheEntity {
    return auth.toPrimitives();
  }
}
