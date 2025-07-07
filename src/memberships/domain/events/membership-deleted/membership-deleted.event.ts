import { Membership } from '../../entities/membership.entity';

export class MembershipDeletedEvent {
  constructor(public readonly membership: Membership) {}
}
