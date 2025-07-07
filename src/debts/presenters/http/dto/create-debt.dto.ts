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

export class CreateDebtDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  expenseId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  fromUserId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  toUserId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(CURRENCY_SYMBOL)
  currency: string;
}
