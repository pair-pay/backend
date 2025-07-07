import { UserInMemoryCacheEntity } from '../entities/user-in-memory-cache.entity';
import { User } from 'src/user/domain/entities/user.entity';

/**
 * Mapper class to convert between Trip domain objects and in-memory cache entities
 */
export class UserInMemoryCacheMapper {
  /**
   * Converts an in-memory cache entity to a Trip domain object
   * @param entity The in-memory cache entity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: UserInMemoryCacheEntity): User {
    return User.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to an in-memory cache entity
   * @param trip The Trip domain object to convert
   * @returns An in-memory cache entity
   */
  static toPersistence(user: User): UserInMemoryCacheEntity {
    return user.toPrimitives();
  }
}
