import { MembershipTypeOrmEntity } from '../entities/membership-type-orm.entity';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

export class TypeOrmMembershipsMapper {
  static toDomain(entity: MembershipTypeOrmEntity): Membership {
    return Membership.fromPrimitives(entity);
  }
  static toPersistence(domain: Membership): MembershipTypeOrmEntity {
    return domain.toPrimitives();
  }
}
