import { Group } from 'src/groups/domain/group';
import { GroupsTypeOrmEntity } from '../entities/groups-type-orm.entity';

export class TypeOrmGroupsMapper {
  static toDomain(entity: GroupsTypeOrmEntity): Group {
    return Group.fromPrimitives(entity);
  }
  static toPersistence(domain: Group): GroupsTypeOrmEntity {
    return domain.toPrimitives();
  }
}
