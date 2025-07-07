import { InvalidAccessTokenException } from '../../exceptions/invalid-access-token.exception';

/**
 * Value Object for JWT Access Token.
 * Encapsulates the token value and its expiration.
 */
export class AuthAccessTokenValueObject {
  /**
   * Creates a new AuthAccessTokenValueObject from a JWT payload.
   * @param value The JWT string
   * @param expiresIn Expiration timestamp (ms since epoch)
   */
  constructor(
    public readonly value: string | undefined,
    public readonly expiresIn: number | undefined,
  ) {
    this.validateValue(value);
    this.validateExpiresIn(expiresIn);
  }

  validateValue(value: string): void {
    if (value === undefined) {
      return;
    }
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new InvalidAccessTokenException(
        'Access token value must be a non-empty string',
      );
    }
  }

  validateExpiresIn(expiresIn: number): void {
    if (expiresIn === undefined) {
      return;
    }
    if (!Number.isFinite(this.expiresIn) || this.expiresIn <= Date.now()) {
      throw new InvalidAccessTokenException(
        'Access token expiration must be a future timestamp',
      );
    }
  }

  /**
   * Checks if the token is expired.
   */
  public isExpired(): boolean {
    return this.expiresIn < Date.now();
  }

  /**
   * Returns the token as a string.
   */
  toString(): string {
    return this.value;
  }

  /**
   * Returns a JSON representation of the token.
   */
  toJson(): { value: string; expiresIn: number } {
    return { value: this.value, expiresIn: this.expiresIn };
  }

  /**
   * Compares this token with another for equality.
   */
  equals(other: AuthAccessTokenValueObject): boolean {
    return (
      other instanceof AuthAccessTokenValueObject &&
      this.value === other.value &&
      this.expiresIn === other.expiresIn
    );
  }

  /**
   * Creates an AuthAccessTokenValueObject from a JWT payload.
   * @param jwt The JWT string
   * @param payload The decoded payload (must include exp in seconds)
   */
  static fromJwtPayload(
    jwt: string,
    payload: { exp: number },
  ): AuthAccessTokenValueObject {
    if (!payload || typeof payload.exp !== 'number') {
      throw new InvalidAccessTokenException(
        'JWT payload must include exp (expiration)',
      );
    }
    // Convert exp (seconds) to ms
    const expiresIn = payload.exp * 1000;
    return new AuthAccessTokenValueObject(jwt, expiresIn);
  }
}
