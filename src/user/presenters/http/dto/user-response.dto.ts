import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Data transfer object for user response
 * Maps the domain User entity to a response format
 */
export class UserResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  updatedAt: string;
}
