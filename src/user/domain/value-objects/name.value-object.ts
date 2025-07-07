import { Logger } from '@nestjs/common';
import { InvalidFullNameException } from '../exceptions/invalid-full-name.exception';

export class NameValueObject {
  private readonly logger = new Logger(NameValueObject.name);

  constructor(public readonly value: string) {
    this.value = this.formatValue(this.value);
    this.validate(this.value);
  }

  public getValue() {
    return this.value;
  }

  private formatValue(text: string) {
    return text.trim().toLowerCase();
  }

  private validate(name: string) {
    this.logger.debug(`Validating name: ${name}`);

    if (!name) {
      this.logger.error(`Invalid name: ${name}`);
      throw new InvalidFullNameException(
        `Invalid full name: ${name}, full name cannot be empty`,
      );
    }

    if (name.length > 255) {
      this.logger.error(`Invalid full name: ${name}`);
      throw new InvalidFullNameException(
        `Invalid full name: ${name}, full name must be less than 255 characters`,
      );
    }

    if (name.length < 2) {
      this.logger.error(`Invalid full name: ${name}`);
      throw new InvalidFullNameException(
        `Invalid full name: ${name}, full name must be at least 3 characters`,
      );
    }
  }

  toJSON(): string {
    return this.value;
  }
}
