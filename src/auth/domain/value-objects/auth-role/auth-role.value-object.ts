import { AuthRoles } from '../../constants/auth-roles.constant';
import { InvalidAuthRoleException } from '../../exceptions/invalid-role.exception';

export class AuthRoleValueObject {
  constructor(public readonly value: string) {
    this.validate(value);
  }

  validate(value: string): void {
    if (!Object.values(AuthRoles).includes(value as AuthRoles)) {
      throw new InvalidAuthRoleException(
        `Invalid auth role: ${value}. Valid roles are: ${Object.values(
          AuthRoles,
        ).join(', ')}`,
      );
    }
  }

  equals(other: AuthRoleValueObject): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }
}
