import { InvalidEmailException } from '../../exceptions/invalid-email.exception';

export class AuthEmailValueObject {
  constructor(public readonly value: string) {
    this.value = this.formatValue(value);
    this.validate(this.value);
  }

  private formatValue(value: string) {
    return value.toLowerCase().trim();
  }

  private validate(value: string) {
    if (!value) {
      throw new InvalidEmailException('Email is required');
    }
    if (!value.includes('@')) {
      throw new InvalidEmailException('Invalid email');
    }
    if (value.length < 5) {
      throw new InvalidEmailException(
        'Email must be at least 5 characters long',
      );
    }
    if (value.length > 255) {
      throw new InvalidEmailException(
        'Email must be less than 255 characters long',
      );
    }
    if (!value.includes('.')) {
      throw new InvalidEmailException('Email must contain a dot');
    }
  }

  toJson() {
    return {
      value: this.value,
    };
  }
}
