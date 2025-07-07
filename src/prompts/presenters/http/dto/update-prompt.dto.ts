import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePromptDto } from './create-prompt.dto';

export class UpdatePromptDto extends PartialType(CreatePromptDto) {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
