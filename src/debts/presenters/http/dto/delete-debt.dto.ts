import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteDebtDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
