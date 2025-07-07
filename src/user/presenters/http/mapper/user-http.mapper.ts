import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserHttpMapper {
  static toResponseDto(user: ResponseUserDto): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
