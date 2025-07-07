import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { CURRENCY_SYMBOL } from 'src/common/constants/currency.constant';

export class DebtResponseDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
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
  @IsNotEmpty()
  @IsEnum(CURRENCY_SYMBOL)
  currency: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  updatedAt: string;
}
