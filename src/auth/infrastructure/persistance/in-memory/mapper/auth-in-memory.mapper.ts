import { AuthInMemoryEntity } from '../entities/auth-in-memory.entity';
import { Auth } from 'src/auth/domain/entities/auth.entity';

/**
 * Mapper class responsible for transforming between User domain objects and UserEntity persistence objects.
 */
export class AuthInMemoryMapper {
  /**
   * Converts a TripInMemoryEntity from the persistence layer to a Trip domain object
   * @param entity - The TripInMemoryEntity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: AuthInMemoryEntity): Auth {
    return Auth.fromPrimitives({
      ...entity,
      accessToken: undefined,
      accessTokenExpiresIn: undefined,
    });
  }

  /**
   * Converts a Trip domain object to a TripInMemoryEntity for persistence
   * @param trip - The Trip domain object to convert
   * @returns A TripInMemoryEntity for persistence
   */
  static toPersistence(auth: Auth): AuthInMemoryEntity {
    return auth.toPrimitives();
  }
}
