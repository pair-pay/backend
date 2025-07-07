import { Membership } from '../entities/membership.entity';
import { randomUUID } from 'crypto';

export class MembershipFactory {
  public create(data: { groupId: string; userId: string }): Membership {
    return new Membership(
      randomUUID(),
      data.groupId,
      data.userId,
      new Date(),
      new Date(),
    );
  }
}
