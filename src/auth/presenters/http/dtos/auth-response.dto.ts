import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserResponseDto } from 'src/user/presenters/http/dto/user-response.dto';

/**
 * Data transfer object for user response
 * Maps the domain User entity to a response format
 */
export class AuthResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  accessToken?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  accessTokenExpiresIn?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  firstLogin: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  lastLogin: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  updatedAt: string;

  @ApiProperty()
  @IsNotEmpty()
  user: UserResponseDto;
}
