import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteGroupDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
