import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteMembershipDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
