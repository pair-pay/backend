import { Auth } from './auth.entity';
import { AuthEmailValueObject } from '../value-objects/auth-email/auth-email.value-object';
import { AuthPasswordValueObject } from '../value-objects/auth-password/auth-password.value-object';
import { AuthAccessTokenValueObject } from '../value-objects/auth-access-token/auth-access-token.value-object';
import { AuthRefreshTokenValueObject } from '../value-objects/auth-refresh-token/auth-refresh-token.value-object';
import { AuthRoleValueObject } from '../value-objects/auth-role/auth-role.value-object';
import { AuthResetPasswordTokenValueObject } from '../value-objects/auth-reset-password-token/auth-reset-password-token.value-object';
import { AuthRoles } from '../constants/auth-roles.constant';

describe('Auth Entity', () => {
  const now = new Date();
  const baseProps = {
    id: 'auth-id',
    userId: 'user-uuid',
    email: new AuthEmailValueObject('test@example.com'),
    password: AuthPasswordValueObject.fromHash('hashed-password'),
    accessToken: new AuthAccessTokenValueObject(
      'access-token',
      Date.now() + 10000,
    ),
    refreshToken: new AuthRefreshTokenValueObject('refresh-token-1234567890'),
    isActive: true,
    role: new AuthRoleValueObject(AuthRoles.USER),
    firstLogin: now,
    lastLogin: now,
    createdAt: now,
    updatedAt: now,
    resetPasswordToken: new AuthResetPasswordTokenValueObject(
      'reset-token',
      new Date(Date.now() + 60000),
    ),
  };

  it('should construct with all properties', () => {
    const auth = new Auth(
      baseProps.id,
      baseProps.userId,
      baseProps.email,
      baseProps.password,
      baseProps.accessToken,
      baseProps.refreshToken,
      baseProps.isActive,
      baseProps.role,
      baseProps.firstLogin,
      baseProps.lastLogin,
      baseProps.createdAt,
      baseProps.updatedAt,
      baseProps.resetPasswordToken,
    );
    expect(auth.id).toBe(baseProps.id);
    expect(auth.userId).toBe(baseProps.userId);
    expect(auth.email).toBeInstanceOf(AuthEmailValueObject);
    expect(auth.password).toBeInstanceOf(AuthPasswordValueObject);
    expect(auth.accessToken).toBeInstanceOf(AuthAccessTokenValueObject);
    expect(auth.refreshToken).toBeInstanceOf(AuthRefreshTokenValueObject);
    expect(auth.isActive).toBe(true);
    expect(auth.role.value).toBe(AuthRoles.USER);
    expect(auth.firstLogin).toBe(now);
    expect(auth.lastLogin).toBe(now);
    expect(auth.createdAt).toBe(now);
    expect(auth.updatedAt).toBe(now);
    expect(auth.resetPasswordToken).toBeInstanceOf(
      AuthResetPasswordTokenValueObject,
    );
  });

  it('should identify admin and user roles', () => {
    const userAuth = new Auth(
      baseProps.id,
      baseProps.userId,
      baseProps.email,
      baseProps.password,
      baseProps.accessToken,
      baseProps.refreshToken,
      baseProps.isActive,
      new AuthRoleValueObject(AuthRoles.USER),
      baseProps.firstLogin,
      baseProps.lastLogin,
      baseProps.createdAt,
      baseProps.updatedAt,
    );
    const adminAuth = new Auth(
      baseProps.id,
      baseProps.userId,
      baseProps.email,
      baseProps.password,
      baseProps.accessToken,
      baseProps.refreshToken,
      baseProps.isActive,
      new AuthRoleValueObject(AuthRoles.ADMIN),
      baseProps.firstLogin,
      baseProps.lastLogin,
      baseProps.createdAt,
      baseProps.updatedAt,
    );
    expect(userAuth.isUser()).toBe(true);
    expect(userAuth.isAdmin()).toBe(false);
    expect(adminAuth.isAdmin()).toBe(true);
    expect(adminAuth.isUser()).toBe(false);
  });

  it('should validate password using value object', async () => {
    const passwordVO = AuthPasswordValueObject.fromHash('hashed-password');
    passwordVO.compare = jest.fn().mockResolvedValue(true);
    const auth = new Auth(
      baseProps.id,
      baseProps.userId,
      baseProps.email,
      passwordVO,
      baseProps.accessToken,
      baseProps.refreshToken,
      baseProps.isActive,
      baseProps.role,
      baseProps.firstLogin,
      baseProps.lastLogin,
      baseProps.createdAt,
      baseProps.updatedAt,
    );
    const result = await auth.validatePassword('plain-password');
    expect(passwordVO.compare).toHaveBeenCalledWith('plain-password');
    expect(result).toBe(true);
  });

  it('should convert to and from primitives', () => {
    const auth = new Auth(
      baseProps.id,
      baseProps.userId,
      baseProps.email,
      baseProps.password,
      baseProps.accessToken,
      baseProps.refreshToken,
      baseProps.isActive,
      baseProps.role,
      baseProps.firstLogin,
      baseProps.lastLogin,
      baseProps.createdAt,
      baseProps.updatedAt,
      baseProps.resetPasswordToken,
    );
    const primitives = auth.toPrimitives();
    expect(primitives.id).toBe(baseProps.id);
    expect(primitives.userId).toBe(baseProps.userId);
    expect(primitives.email).toBe(baseProps.email.value);
    expect(primitives.password).toBe(baseProps.password.value);
    expect(primitives.accessToken).toBe(baseProps.accessToken.value);
    expect(primitives.refreshToken).toBe(baseProps.refreshToken.value);
    expect(primitives.isActive).toBe(true);
    expect(primitives.role).toBe(baseProps.role.value);
    expect(primitives.firstLogin).toBe(baseProps.firstLogin);
    expect(primitives.lastLogin).toBe(baseProps.lastLogin);
    expect(primitives.createdAt).toBe(baseProps.createdAt);
    expect(primitives.updatedAt).toBe(baseProps.updatedAt);
    expect(primitives.resetPasswordToken).toBe(
      baseProps.resetPasswordToken.value,
    );
    expect(primitives.resetPasswordTokenExpiresAt).toBe(
      baseProps.resetPasswordToken.expiresAt,
    );

    // fromPrimitives
    const from = Auth.fromPrimitives({
      ...primitives,
    });
    expect(from).toBeInstanceOf(Auth);
    expect(from.id).toBe(auth.id);
    expect(from.email.value).toBe(auth.email.value);
  });

  it('should update refresh token immutably', () => {
    const auth = new Auth(
      baseProps.id,
      baseProps.userId,
      baseProps.email,
      baseProps.password,
      baseProps.accessToken,
      baseProps.refreshToken,
      baseProps.isActive,
      baseProps.role,
      baseProps.firstLogin,
      baseProps.lastLogin,
      baseProps.createdAt,
      baseProps.updatedAt,
    );
    const newRefreshToken = new AuthRefreshTokenValueObject(
      'new-refresh-token-1234567890',
    );
    const updated = auth.updateRefreshToken(newRefreshToken);
    expect(updated).not.toBe(auth);
    expect(updated.refreshToken.value).toBe('new-refresh-token-1234567890');
    expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(
      auth.updatedAt.getTime(),
    );
  });

  it('should update password and clear resetPasswordToken', () => {
    const auth = new Auth(
      baseProps.id,
      baseProps.userId,
      baseProps.email,
      baseProps.password,
      baseProps.accessToken,
      baseProps.refreshToken,
      baseProps.isActive,
      baseProps.role,
      baseProps.firstLogin,
      baseProps.lastLogin,
      baseProps.createdAt,
      baseProps.updatedAt,
      baseProps.resetPasswordToken,
    );
    const newPassword = AuthPasswordValueObject.fromHash('new-hash');
    const updated = auth.updatePassword(newPassword);
    expect(updated).not.toBe(auth);
    expect(updated.password.value).toBe('new-hash');
    expect(updated.resetPasswordToken).toBeUndefined();
    expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(
      auth.updatedAt.getTime(),
    );
  });
});
