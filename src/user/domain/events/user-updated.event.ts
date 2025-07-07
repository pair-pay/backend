import { User } from '../entities/user.entity';

export class UserUpdatedEvent {
  constructor(public readonly user: User) {}
}
