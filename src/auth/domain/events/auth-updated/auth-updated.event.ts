import { Auth } from '../../entities/auth.entity';

export class AuthUpdatedEvent {
  constructor(public readonly auth: Auth) {}
}
