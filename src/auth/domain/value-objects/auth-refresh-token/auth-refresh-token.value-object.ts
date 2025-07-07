import { InvalidRefreshTokenException } from '../../exceptions/invalid-refresh-token.exception';
import { randomBytes } from 'crypto';

/**
 * Value object for Auth Refresh Token.
 * Ensures the refresh token is not empty and has a minimum length.
 */
export class AuthRefreshTokenValueObject {
  /**
   * The value of the refresh token.
   */
  public readonly value: string;

  /**
   * Creates a new AuthRefreshTokenValueObject.
   * @param value The refresh token string
   * @throws Error if the value is empty or too short
   */
  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  /**
   * Generates a secure random refresh token.
   * @param length The length in bytes (default: 32)
   * @returns AuthRefreshTokenValueObject
   */
  static generate(length = 32): AuthRefreshTokenValueObject {
    const token = randomBytes(length).toString('hex');
    return new AuthRefreshTokenValueObject(token);
  }

  /**
   * Validates the refresh token value.
   * @param value The value to validate
   */
  private validate(value: string) {
    if (!value || value.length < 16) {
      throw new InvalidRefreshTokenException(
        'Invalid refresh token: must be at least 16 characters long',
      );
    }
  }
}
