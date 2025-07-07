import { InvalidResetPasswordTokenException } from '../../exceptions/invalid-reset-password-token.exception';

export class AuthResetPasswordTokenValueObject {
  constructor(
    public readonly value: string | undefined,
    public readonly expiresAt: Date,
  ) {}

  validateValue(value: string): void {
    if (value === undefined) {
      return;
    }
    if (
      !this.value ||
      typeof this.value !== 'string' ||
      this.value.trim() === ''
    ) {
      throw new InvalidResetPasswordTokenException(
        'Reset password token must be a non-empty string',
      );
    }
  }

  validateExpiresAt(expiresAt: Date): void {
    if (expiresAt === undefined) {
      return;
    }
    if (!(expiresAt instanceof Date) || expiresAt.getTime() <= Date.now()) {
      throw new InvalidResetPasswordTokenException(
        'Reset password token expiration must be a future date',
      );
    }
  }

  isExpired(): boolean {
    return this.expiresAt.getTime() < Date.now();
  }

  toString(): string {
    return `${this.value} - ${this.expiresAt}`;
  }

  toJson(): { value: string; expiresAt: Date } {
    return {
      value: this.value,
      expiresAt: this.expiresAt,
    };
  }
}
