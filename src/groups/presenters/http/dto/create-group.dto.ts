import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  createdByUserId?: string;
}
