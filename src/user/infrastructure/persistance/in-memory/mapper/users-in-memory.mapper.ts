import { UserInMemoryEntity } from '../entities/user-in-memory.entity';
import { User } from 'src/user/domain/entities/user.entity';

/**
 * Mapper class responsible for transforming between User domain objects and UserEntity persistence objects.
 */
export class UsersInMemoryMapper {
  /**
   * Converts a TripInMemoryEntity from the persistence layer to a Trip domain object
   * @param entity - The TripInMemoryEntity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: UserInMemoryEntity): User {
    return User.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to a TripInMemoryEntity for persistence
   * @param trip - The Trip domain object to convert
   * @returns A TripInMemoryEntity for persistence
   */
  static toPersistence(user: User): UserInMemoryEntity {
    return user.toPrimitives();
  }
}
