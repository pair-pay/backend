import { Group } from 'src/groups/domain/group';
import { GroupsInMemoryCacheEntity } from '../entities/groups-in-memory-cache.entity';

export class InMemoryGroupsCacheMapper {
  static toDomain(entity: GroupsInMemoryCacheEntity): Group {
    return Group.fromPrimitives(entity);
  }
  static toPersistence(domain: Group): GroupsInMemoryCacheEntity {
    return domain.toPrimitives();
  }
}
