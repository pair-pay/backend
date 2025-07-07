import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { UserResponseDto } from 'src/user/presenters/http/dto/user-response.dto';

export class GroupResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  updatedAt: string;

  @ApiProperty({ type: UserResponseDto, required: false })
  @Type(() => UserResponseDto)
  users?: UserResponseDto[];
}
