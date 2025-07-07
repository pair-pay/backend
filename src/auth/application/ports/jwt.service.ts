/**
 * Interface for JWT service abstraction.
 * Provides methods to sign and verify JWT tokens.
 */
export abstract class JwtService {
  /**
   * Signs a payload and returns a JWT token.
   * @param payload The payload to sign
   * @param options Optional signing options (e.g., expiresIn)
   * @returns Promise<string> The signed JWT token
   */
  abstract sign(
    payload: any,
    options?: { expiresIn?: string | number },
  ): Promise<string>;

  /**
   * Verifies a JWT token and returns the decoded payload.
   * @param token The JWT token to verify
   * @returns Promise<any> The decoded payload
   */
  abstract verify(token: string): Promise<any>;

  /**
   * Signs a payload and returns an AuthAccessTokenValueObject.
   * @param payload The payload to sign
   * @returns Promise<AuthAccessTokenValueObject>
   */
  abstract createAccessToken(
    payload: any,
  ): Promise<
    import('src/auth/domain/value-objects/auth-access-token/auth-access-token.value-object').AuthAccessTokenValueObject
  >;
}
