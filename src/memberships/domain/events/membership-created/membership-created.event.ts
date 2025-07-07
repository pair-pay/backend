import { Membership } from '../../entities/membership.entity';

export class MembershipCreatedEvent {
  constructor(public readonly membership: Membership) {}
}
