import { User } from '../entities/user.entity';

export class UserDeletedEvent {
  constructor(public readonly user: User) {}
}
