import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeletePromptDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
