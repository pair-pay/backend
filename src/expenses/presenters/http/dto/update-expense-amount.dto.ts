import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseAmountDto extends PartialType(
  PickType(CreateExpenseDto, ['amount', 'currency']),
) {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
