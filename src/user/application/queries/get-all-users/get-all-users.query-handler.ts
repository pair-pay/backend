import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../ports/user.repository';
import { GetAllUsersQuery } from './get-all-users.query';
import { Logger } from '@nestjs/common';
import { ResponseUserDto } from '../../dtos/response-user.dto';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersQueryHandler
  implements IQueryHandler<GetAllUsersQuery>
{
  private readonly logger = new Logger(GetAllUsersQueryHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<ResponseUserDto[]> {
    this.logger.debug('Executing GetAllUsersQuery');
    const users = await this.userRepository.findAll();

    this.logger.debug(`Found ${users.length} users`);

    return users.map(
      (user) =>
        new ResponseUserDto(
          user.id,
          user.name.value,
          user.image.value,
          user.createdAt,
          user.updatedAt,
        ),
    );
  }
}
