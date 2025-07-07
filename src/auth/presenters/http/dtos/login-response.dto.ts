// apps/api/src/auth/presenters/http/dtos/login-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/presenters/http/dto/user-response.dto';
import { AuthResponseDto } from './auth-response.dto';

export class LoginResponseDto extends AuthResponseDto {
  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;
}
