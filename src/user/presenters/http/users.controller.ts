import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import { GetAllUsersQuery } from 'src/user/application/queries/get-all-users/get-all-users.query';
import { CreateUserCommand } from 'src/user/application/commands/create-user.command';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserCommand } from 'src/user/application/commands/update-user.command';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserCommand } from 'src/user/application/commands/delete-user.command';
import { DeleteUserDto } from './dto/delete-user.dto';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { UserHttpMapper } from './mapper/user-http.mapper';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users' })
  async getAllUsers() {
    const users = await this.userService.findAll(new GetAllUsersQuery());
    return users.map((user) => UserHttpMapper.toResponseDto(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Returns a user' })
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findById(new GetUserByIdQuery(id));
    return UserHttpMapper.toResponseDto(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: ' created successfully' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(
      new CreateUserCommand(createUserDto),
    );
    return UserHttpMapper.toResponseDto(user);
  }

  @Put()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: ' updated successfully' })
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(
      new UpdateUserCommand(updateUserDto.id, updateUserDto),
    );
    return UserHttpMapper.toResponseDto(user);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: ' deleted successfully' })
  async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    const user = await this.userService.delete(
      new DeleteUserCommand(deleteUserDto.id),
    );
    return UserHttpMapper.toResponseDto(user);
  }
}
