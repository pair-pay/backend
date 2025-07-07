import { Group } from 'src/groups/domain/group';
import { MembershipRedisCacheEntity } from '../entities/membership-redis-cache.entity';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

export class MembershipRedisCacheMapper {
  static toDomain(entity: MembershipRedisCacheEntity): Membership {
    return Membership.fromPrimitives(entity);
  }
  static toPersistence(domain: Membership): MembershipRedisCacheEntity {
    return domain.toPrimitives();
  }
}
