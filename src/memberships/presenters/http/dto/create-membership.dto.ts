import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMembershipDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
