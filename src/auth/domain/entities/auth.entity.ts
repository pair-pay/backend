import { AuthPrimitive } from '../primitives/auth.primitive';
import { AuthEmailValueObject } from '../value-objects/auth-email/auth-email.value-object';
import { AuthPasswordValueObject } from '../value-objects/auth-password/auth-password.value-object';
import { AuthRefreshTokenValueObject } from '../value-objects/auth-refresh-token/auth-refresh-token.value-object';
import { AuthRoleValueObject } from '../value-objects/auth-role/auth-role.value-object';
import { AuthRoles } from '../constants/auth-roles.constant';
import { AuthAccessTokenValueObject } from '../value-objects/auth-access-token/auth-access-token.value-object';
import { AuthResetPasswordTokenValueObject } from '../value-objects/auth-reset-password-token/auth-reset-password-token.value-object';

/**
 * Aggregate root for authentication and authorization domain logic.
 * @property userId Reference to the user entity (UUID)
 * @property refreshToken The refresh token for the user
 * @property firstLogin The date of the user's first login
 */
export class Auth {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly email: AuthEmailValueObject,
    public readonly password: AuthPasswordValueObject,
    public accessToken: AuthAccessTokenValueObject,
    public readonly refreshToken: AuthRefreshTokenValueObject,
    public readonly isActive: boolean,
    public readonly role: AuthRoleValueObject,
    public firstLogin: Date,
    public lastLogin: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public resetPasswordToken?: AuthResetPasswordTokenValueObject,
  ) {}

  public isAdmin(): boolean {
    return this.role.value === AuthRoles.ADMIN;
  }

  public isUser(): boolean {
    return this.role.value === AuthRoles.USER;
  }

  public async validatePassword(plainPassword: string): Promise<boolean> {
    return this.password.compare(plainPassword);
  }

  public isFirstLogin(): boolean {
    return this.firstLogin === this.createdAt;
  }

  public setLastLogin(): void {
    this.lastLogin = new Date();
  }

  public setFirstLogin(): void {
    this.firstLogin = new Date();
  }

  public equals(other: Auth): boolean {
    return this.toPrimitives() === other.toPrimitives();
  }

  /**
   * Creates an Auth entity from primitives.
   * @param primitives The primitive values
   * @returns Auth
   */
  static fromPrimitives(primitives: AuthPrimitive): Auth {
    return new Auth(
      primitives.id,
      primitives.userId,
      new AuthEmailValueObject(primitives.email),
      AuthPasswordValueObject.fromHash(primitives.password),
      new AuthAccessTokenValueObject(
        primitives.accessToken,
        primitives.accessTokenExpiresIn,
      ),
      new AuthRefreshTokenValueObject(primitives.refreshToken),
      primitives.isActive,
      new AuthRoleValueObject(primitives.role),
      new Date(primitives.firstLogin),
      new Date(primitives.lastLogin),
      new Date(primitives.createdAt),
      new Date(primitives.updatedAt),
      primitives.resetPasswordToken
        ? new AuthResetPasswordTokenValueObject(
            primitives.resetPasswordToken,
            primitives.resetPasswordTokenExpiresAt,
          )
        : undefined,
    );
  }

  /**
   * Converts the Auth entity to primitives.
   * @returns AuthPrimitive
   */
  toPrimitives(): AuthPrimitive {
    return {
      id: this.id,
      userId: this.userId,
      email: this.email.value,
      password: this.password.value,
      accessToken: this.accessToken.value,
      accessTokenExpiresIn: this.accessToken.expiresIn,
      refreshToken: this.refreshToken.value,
      isActive: this.isActive,
      role: this.role.value,
      firstLogin: this.firstLogin,
      lastLogin: this.lastLogin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      resetPasswordToken: this.resetPasswordToken?.value,
      resetPasswordTokenExpiresAt: this.resetPasswordToken?.expiresAt,
    };
  }

  /**
   * Returns a new Auth aggregate with the updated refresh token.
   * @param newRefreshToken The new refresh token value object
   * @returns Auth
   */
  public updateRefreshToken(
    newRefreshToken: AuthRefreshTokenValueObject,
  ): Auth {
    return new Auth(
      this.id,
      this.userId,
      this.email,
      this.password,
      this.accessToken,
      newRefreshToken,
      this.isActive,
      this.role,
      this.firstLogin,
      this.lastLogin,
      this.createdAt,
      new Date(), // updatedAt
    );
  }

  /**
   * Returns a new Auth aggregate with the updated password and clears the reset token.
   * @param newPassword The new AuthPasswordValueObject
   * @returns Auth
   */
  public updatePassword(newPassword: AuthPasswordValueObject): Auth {
    return new Auth(
      this.id,
      this.userId,
      this.email,
      newPassword,
      this.accessToken,
      this.refreshToken,
      this.isActive,
      this.role,
      this.firstLogin,
      this.lastLogin,
      this.createdAt,
      new Date(), // updatedAt
      undefined, // resetPasswordToken
    );
  }

  public update(
    data: Partial<{
      email: string;
      password: string;
      accessToken: string;
      refreshToken: string;
      isActive: boolean;
      role: string;
    }>,
  ): Auth {
    return new Auth(
      this.id,
      this.userId,
      this.email,
      this.password,
      this.accessToken,
      this.refreshToken,
      this.isActive,
      this.role,
      this.firstLogin,
      this.lastLogin,
      this.createdAt,
      new Date(), // updatedAt
      undefined, // resetPasswordToken
    );
  }
}
