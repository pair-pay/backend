import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class ExpenseResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  paidByUserId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  updatedAt: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  splitType: string;
}
