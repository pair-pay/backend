import { randomUUID } from 'crypto';
import { Auth } from '../entities/auth.entity';
import { AuthEmailValueObject } from '../value-objects/auth-email/auth-email.value-object';
import { AuthPasswordValueObject } from '../value-objects/auth-password/auth-password.value-object';
import { AuthRefreshTokenValueObject } from '../value-objects/auth-refresh-token/auth-refresh-token.value-object';
import { Logger } from '@nestjs/common';
import { AuthRoleValueObject } from '../value-objects/auth-role/auth-role.value-object';
import { AuthRoles } from '../constants/auth-roles.constant';
import { AuthAccessTokenValueObject } from '../value-objects/auth-access-token/auth-access-token.value-object';

export class AuthFactory {
  private readonly logger = new Logger(AuthFactory.name);

  public async create(auth: {
    email: string;
    password: string;
    userId: string;
    refreshToken?: string;
    firstLogin?: Date;
    role?: string;
  }) {
    this.logger.log(`Creating auth for user ${auth.userId}`);
    this.logger.log(`Email: ${auth.email}`);
    this.logger.log(`Password: ${auth.password}`);
    this.logger.log(`Refresh token: ${auth.refreshToken}`);
    this.logger.log(`First login: ${auth.firstLogin}`);

    return new Auth(
      randomUUID(),
      auth.userId,
      new AuthEmailValueObject(auth.email),
      await AuthPasswordValueObject.fromPlain(auth.password),
      undefined, // accessToken as undefined because it will be set later
      auth.refreshToken
        ? new AuthRefreshTokenValueObject(auth.refreshToken)
        : AuthRefreshTokenValueObject.generate(),
      true,
      new AuthRoleValueObject(auth.role ?? AuthRoles.USER),
      auth.firstLogin ?? new Date(),
      new Date(),
      new Date(),
      new Date(),
    );
  }
}
