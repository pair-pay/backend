import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CURRENCY_SYMBOL } from 'src/common/constants/currency.constant';
import { SPLIT_TYPES } from 'src/expenses/domain/constants/split-types.constant';

export class CreateExpenseDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(CURRENCY_SYMBOL)
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
  @IsUUID()
  @IsNotEmpty()
  paidByUserId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(SPLIT_TYPES)
  splitType?: string;
}
