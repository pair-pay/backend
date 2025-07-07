import { Logger } from '@nestjs/common';
import { UserInvalidImageException } from '../../exceptions/user-invalid-image.exception';

export class UserImageValueObject {
  private readonly logger = new Logger(UserImageValueObject.name);
  constructor(public readonly value: string | null | undefined) {
    this.validate(value);
  }

  /**
   * Validates the image URL. Accepts null, undefined, or strings starting with 'https://', 'http://', or 'data:'.
   * @param value The image URL to validate
   * @throws UserInvalidImageException if the value is not valid
   */
  validate(value: string | null | undefined): void {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value !== 'string') {
      this.logger.error('User image must be a string');
      throw new UserInvalidImageException('User image must be a string');
    }
    if (
      !(
        value.startsWith('https://') ||
        value.startsWith('http://') ||
        value.startsWith('data:')
      )
    ) {
      this.logger.error(
        'User image must be a valid URL (http, https, or data-uri)',
      );
      throw new UserInvalidImageException(
        'User image must be a valid URL (http, https, or data-uri)',
      );
    }
  }

  /**
   * Compares this value object with another for equality
   * @param other Another UserImageValueObject
   * @returns true if values are equal
   */
  equals(other: UserImageValueObject): boolean {
    return this.value === other.value;
  }

  /**
   * Returns the string representation of the value
   */
  toString(): string {
    return this.value;
  }

  /**
   * Returns the JSON representation of the value
   */
  toJson(): { value: string } {
    return { value: this.value };
  }
}
