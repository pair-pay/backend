import { Logger } from '@nestjs/common';
import { InvalidNameException } from '../exceptions/invalid-name.exception';

export class NameValueObject {
  private readonly logger = new Logger(NameValueObject.name);

  constructor(public readonly value: string) {
    this.value = this.formatValue(this.value);
    this.validate(this.value);
  }

  private formatValue(value: string) {
    return value.trim().toLowerCase();
  }

  private validate(name: string) {
    this.logger.debug(`Validating name: ${name}`);

    if (!name) {
      this.logger.error(`Invalid name: ${name}`);
      throw new InvalidNameException(
        `Invalid name: ${name}, name cannot be empty`,
      );
    }

    if (name.length > 255) {
      this.logger.error(`Invalid name: ${name}`);
      throw new InvalidNameException(
        `Invalid name: ${name}, name must be less than 255 characters`,
      );
    }

    if (name.length < 2) {
      this.logger.error(`Invalid name: ${name}`);
      throw new InvalidNameException(
        `Invalid name: ${name}, name must be at least 3 characters`,
      );
    }
  }

  toJSON(): { value: string } {
    return { value: this.value };
  }
}
