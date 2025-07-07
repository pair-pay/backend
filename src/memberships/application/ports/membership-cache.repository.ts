import { Membership } from 'src/memberships/domain/entities/membership.entity';

export abstract class MembershipCacheRepository {
  public abstract get(key: string): Promise<Membership | null>;
  public abstract set(
    key: string,
    value: Membership,
    ttl?: number,
  ): Promise<void>;
  public abstract delete(key: string): Promise<void>;
  public abstract clear(): Promise<void>;
}
