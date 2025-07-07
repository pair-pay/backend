import { InvalidEmailException } from '../../exceptions/invalid-email.exception';
import { InvalidPasswordException } from '../../exceptions/invalid-password.exception';
import * as bcrypt from 'bcrypt';

/**
 * Value Object for Auth Password.
 * Use static methods to create from plain or hashed password.
 */
export class AuthPasswordValueObject {
  /**
   * The hashed password value.
   */
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    this.validate(this.value);
  }

  /**
   * Creates a Value Object from a plain password (hashes it).
   * @param plainPassword The plain password to hash and store.
   * @returns AuthPasswordValueObject
   */
  static async fromPlain(
    plainPassword: string,
  ): Promise<AuthPasswordValueObject> {
    this.validateStatic(plainPassword);
    const hash = await bcrypt.hash(plainPassword, 10);
    return new AuthPasswordValueObject(hash);
  }

  /**
   * Creates a Value Object from a hashed password (e.g., from DB).
   * @param hash The hashed password.
   * @returns AuthPasswordValueObject
   */
  static fromHash(hash: string): AuthPasswordValueObject {
    return new AuthPasswordValueObject(hash);
  }

  /**
   * Compares a plain password with the stored hash.
   * @param plainPassword The plain password to compare.
   * @returns Promise<boolean> True if matches, false otherwise.
   */
  async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.value);
  }

  /**
   * Validates the password (static, for plain passwords).
   * @param value The password to validate.
   */
  private static validateStatic(value: string) {
    if (!value) {
      throw new InvalidPasswordException('Password is required');
    }
    if (value.length < 12) {
      throw new InvalidPasswordException(
        'Password must be at least 12 characters long',
      );
    }
    if (value.length > 255) {
      throw new InvalidPasswordException(
        'Password must be less than 255 characters long',
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      throw new InvalidPasswordException(
        'Password must contain at least one symbol',
      );
    }
    if (!/\d/.test(value)) {
      throw new InvalidPasswordException(
        'Password must contain at least one number',
      );
    }
  }

  /**
   * Validates the hash (instance, for hashed passwords).
   * @param value The hash to validate.
   */
  private validate(value: string) {
    if (!value) {
      throw new InvalidPasswordException('Password hash is required');
    }
    // Optionally, add more hash validation if needed
  }

  /**
   * Returns the value as JSON.
   */
  public toJson() {
    return {
      value: this.value,
    };
  }
}
