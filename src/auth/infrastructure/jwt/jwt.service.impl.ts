import { JwtService as IJwtService } from 'src/auth/application/ports/jwt.service';
import * as jwt from 'jsonwebtoken';
import { AuthAccessTokenValueObject } from 'src/auth/domain/value-objects/auth-access-token/auth-access-token.value-object';

/**
 * Concrete implementation of JwtService using jsonwebtoken.
 */
export class JwtServiceImpl extends IJwtService {
  private readonly secret = process.env.JWT_SECRET;
  private readonly expiresIn = process.env.JWT_EXPIRES_IN;

  /**
   * Signs a payload and returns a JWT token.
   * @param payload The payload to sign
   * @param options Optional signing options (e.g., expiresIn)
   * @returns Promise<string> The signed JWT token
   */
  async sign(
    payload: any,
    options?: { expiresIn?: string | number },
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const jwtOptions: jwt.SignOptions = {
        algorithm: 'HS256',
      };
      if (options && options.expiresIn !== undefined) {
        jwtOptions.expiresIn = Number(options.expiresIn);
      } else {
        jwtOptions.expiresIn = Number(this.expiresIn);
      }
      jwt.sign(payload, this.secret, jwtOptions, (err, token) => {
        if (err || !token) {
          return reject(err);
        }
        resolve(token);
      });
    });
  }

  /**
   * Verifies a JWT token and returns the decoded payload.
   * @param token The JWT token to verify
   * @returns Promise<any> The decoded payload
   */
  async verify(token: string): Promise<any> {
    return jwt.verify(token, this.secret);
  }

  /**
   * Signs a payload and returns an AuthAccessTokenValueObject.
   * @param payload The payload to sign
   * @returns Promise<AuthAccessTokenValueObject>
   */
  async createAccessToken(payload: any): Promise<AuthAccessTokenValueObject> {
    const expiresIn = 15 * 60; // 15 minutos
    const token = await this.sign(payload, { expiresIn });
    const decoded: any = await this.verify(token);
    return AuthAccessTokenValueObject.fromJwtPayload(token, decoded);
  }
}
