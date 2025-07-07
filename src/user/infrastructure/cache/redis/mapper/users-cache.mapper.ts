import { UserRedisCacheEntity } from '../entities/user-cache.entity';
import { User } from 'src/user/domain/entities/user.entity';

/**
 * Mapper class to convert between Trip domain objects and Redis cache entities
 */
export class UserRedisCacheMapper {
  /**
   * Converts a Redis cache entity to a Trip domain object
   * @param entity The Redis cache entity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: UserRedisCacheEntity): User {
    return User.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to a Redis cache entity
   * @param trip The Trip domain object to convert
   * @returns A Redis cache entity
   */
  static toPersistence(user: User): UserRedisCacheEntity {
    return user.toPrimitives();
  }
}
