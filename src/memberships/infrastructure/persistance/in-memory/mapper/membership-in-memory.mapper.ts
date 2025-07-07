import { MembershipInMemoryEntity } from '../entities/membership-in-memory.entity';
import { Membership } from 'src/memberships/domain/entities/membership.entity';

export class MembershipInMemoryMapper {
  static toDomain(entity: MembershipInMemoryEntity): Membership {
    return Membership.fromPrimitives(entity);
  }
  static toPersistence(domain: Membership): MembershipInMemoryEntity {
    return domain.toPrimitives();
  }
}
