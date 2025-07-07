import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class PromptResponseDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  template: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  version: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  updatedAt: string;
}
