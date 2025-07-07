import { UserTypeOrmEntity } from '../entities/user-type-orm.entity';
import { User } from 'src/user/domain/entities/user.entity';

export class TypeOrmUserMapper {
  static toDomain(entity: UserTypeOrmEntity): User {
    return User.fromPrimitives({
      ...entity,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    });
  }

  static toPersistence(user: User): UserTypeOrmEntity {
    const primitives = user.toPrimitives();

    return {
      ...primitives,
      createdAt: new Date(primitives.createdAt),
      updatedAt: new Date(primitives.updatedAt),
    };
  }
}
