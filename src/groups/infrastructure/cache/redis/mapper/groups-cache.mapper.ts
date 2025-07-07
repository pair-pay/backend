import { Group } from 'src/groups/domain/group';
import { GroupRedisCacheEntity } from '../entities/group-redis-cache.entity';

export class GroupsRedisCacheMapper {
  static toDomain(entity: GroupRedisCacheEntity): Group {
    return Group.fromPrimitives(entity);
  }
  static toPersistence(domain: Group): GroupRedisCacheEntity {
    return domain.toPrimitives();
  }
}
