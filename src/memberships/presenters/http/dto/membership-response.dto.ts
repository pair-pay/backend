import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { GroupResponseDto } from 'src/groups/presenters/http/dto/group-response.dto';
import { UserResponseDto } from 'src/user/presenters/http/dto/user-response.dto';

export class MembershipResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  updatedAt: string;

  @ApiProperty({ type: GroupResponseDto, required: false })
  @Type(() => GroupResponseDto)
  groups?: GroupResponseDto[];

  @ApiProperty({ type: UserResponseDto, required: false })
  @Type(() => UserResponseDto)
  users?: UserResponseDto[];
}
