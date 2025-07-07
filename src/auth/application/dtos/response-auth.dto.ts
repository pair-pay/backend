import { AuthEmailValueObject } from 'src/auth/domain/value-objects/auth-email/auth-email.value-object';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';

export class ResponseAuthDto {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly isActive: boolean,
    public readonly role: string,
    public readonly firstLogin: string,
    public readonly lastLogin: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly user: ResponseUserDto,
    public readonly accessTokenExpiresIn: number,
    public readonly resetPasswordToken?: string,
  ) {}
}
