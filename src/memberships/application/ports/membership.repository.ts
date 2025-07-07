import { Membership } from 'src/memberships/domain/entities/membership.entity';

export abstract class MembershipRepository {
  public abstract findAll(): Promise<Membership[]>;
  public abstract findById(id: string): Promise<Membership>;
  public abstract findByGroupId(groupId: string): Promise<Membership[]>;
  public abstract findByUserId(userId: string): Promise<Membership[]>;
  public abstract findByGroupIdAndUserId(
    groupId: string,
    userId: string,
  ): Promise<Membership>;
  public abstract create(membership: Membership): Promise<Membership>;
  public abstract update(membership: Membership): Promise<Membership>;
  public abstract delete(id: string): Promise<Membership>;
}
