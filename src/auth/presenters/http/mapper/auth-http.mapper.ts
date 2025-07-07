import { Auth } from 'src/auth/domain/entities/auth.entity';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { UserHttpMapper } from 'src/user/presenters/http/mapper/user-http.mapper';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { User } from 'src/user/domain/entities/user.entity';
import { RefreshTokenResponseDto } from '../dtos/refresh-token-response.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';
import { ResponseAuthDto } from 'src/auth/application/dtos/response-auth.dto';

export class AuthHttpMapper {
  static toResponseDto(auth: ResponseAuthDto): AuthResponseDto {
    return {
      id: auth.id,
      userId: auth.userId,
      email: auth.email,
      accessToken: auth.accessToken,
      accessTokenExpiresIn: auth.accessTokenExpiresIn,
      refreshToken: auth.refreshToken,
      role: auth.role,
      firstLogin: auth.firstLogin,
      lastLogin: auth.lastLogin,
      createdAt: auth.createdAt,
      updatedAt: auth.updatedAt,
      user: UserHttpMapper.toResponseDto(auth.user),
    };
  }

  static toRefreshTokenResponseDto(
    accessToken: string,
    refreshToken: string,
  ): RefreshTokenResponseDto {
    return { accessToken, refreshToken };
  }
}
