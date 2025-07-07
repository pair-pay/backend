import { RegisterUserByEmailDto } from '../../dtos/register-user-by-email.dto';

export class RegisterUserByEmailCommand {
  constructor(public readonly data: RegisterUserByEmailDto) {}
}
