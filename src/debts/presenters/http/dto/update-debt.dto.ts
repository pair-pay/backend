import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { CreateDebtDto } from './create-debt.dto';

export class UpdateDebtDto extends PartialType(CreateDebtDto) {
  @ApiProperty({
    description: 'The ID of the debt to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The ID of the expense to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  status?: string;
}
