import { MembershipInMemoryCacheEntity } from '../entities/membership-in-memory-cache.entity';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

export class MembershipInMemoryCacheMapper {
  static toDomain(entity: MembershipInMemoryCacheEntity): Membership {
    return Membership.fromPrimitives(entity);
  }
  static toPersistence(domain: Membership): MembershipInMemoryCacheEntity {
    return domain.toPrimitives();
  }
}
