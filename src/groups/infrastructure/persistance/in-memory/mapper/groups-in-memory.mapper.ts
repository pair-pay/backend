import { Group } from 'src/groups/domain/group';
import { GroupsInMemoryEntity } from '../entities/groups-in-memory.entity';

export class GroupsInMemoryMapper {
  static toDomain(entity: GroupsInMemoryEntity): Group {
    return Group.fromPrimitives(entity);
  }
  static toPersistence(domain: Group): GroupsInMemoryEntity {
    return domain.toPrimitives();
  }
}
