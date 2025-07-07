import { Auth } from '../../entities/auth.entity';

export class AuthCreatedEvent {
  constructor(public readonly auth: Auth) {}
}
