import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO for refresh token request.
 */
export class RefreshTokenRequestDto {
  @ApiProperty({ description: 'The refresh token string' })
  @IsString()
  @IsNotEmpty()
  @MinLength(16)
  refreshToken: string;
}
