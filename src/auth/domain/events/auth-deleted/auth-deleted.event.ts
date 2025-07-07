import { Auth } from '../../entities/auth.entity';

export class AuthDeletedEvent {
  constructor(public readonly auth: Auth) {}
}
