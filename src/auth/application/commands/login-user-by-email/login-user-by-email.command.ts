import { LoginUserByEmailDto } from '../../dtos/login-user-by-email.dto';

export class LoginUserByEmailCommand {
  constructor(public readonly data: LoginUserByEmailDto) {}
}
