import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../queries/get-all-users/get-all-users.query';
import { GetUserByIdQuery } from '../queries/get-user-by-id/get-user-by-id.query';
import { CreateUserCommand } from '../commands/create-user.command';
import { UpdateUserCommand } from '../commands/update-user.command';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { User } from '../../domain/entities/user.entity';
import { ResponseUserDto } from '../dtos/response-user.dto';

/**
 * Service class that handles trip-related operations using CQRS pattern
 */
@Injectable()
export class UserService {
  /**
   * Creates an instance of UserService
   * @param commandBus - Bus for dispatching commands
   * @param queryBus - Bus for dispatching queries
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Retrieves all users
   * @param getAllUsersQuery - Query to get all users
   * @returns Promise containing array of User entities
   */
  public async findAll(
    getAllUsersQuery: GetAllUsersQuery,
  ): Promise<ResponseUserDto[]> {
    return await this.queryBus.execute(getAllUsersQuery);
  }

  /**
   * Finds a user by its ID
   * @param getUserByIdQuery - Query containing user ID to find
   * @returns Promise containing the found User entity
   */
  public async findById(
    getUserByIdQuery: GetUserByIdQuery,
  ): Promise<ResponseUserDto> {
    return await this.queryBus.execute(getUserByIdQuery);
  }

  /**
   * Creates a new user
   * @param createUserCommand - Command containing user data to create
   * @returns Promise containing the created User entity
   */
  public async create(
    createUserCommand: CreateUserCommand,
  ): Promise<ResponseUserDto> {
    return await this.commandBus.execute(createUserCommand);
  }

  /**
   * Updates an existing trip
   * @param updateUserCommand - Command containing user data to update
   * @returns Promise containing the updated User entity
   */
  public async update(
    updateUserCommand: UpdateUserCommand,
  ): Promise<ResponseUserDto> {
    return await this.commandBus.execute(updateUserCommand);
  }

  /**
   * Deletes an existing trip
   * @param deleteUserCommand - Command containing user ID to delete
   * @returns Promise containing the deleted User entity
   */
  public async delete(
    deleteUserCommand: DeleteUserCommand,
  ): Promise<ResponseUserDto> {
    return await this.commandBus.execute(deleteUserCommand);
  }
}
