import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for refresh token response.
 */
export class RefreshTokenResponseDto {
  @ApiProperty({ description: 'The new access token' })
  accessToken: string;

  @ApiProperty({ description: 'The new refresh token' })
  refreshToken: string;
}
