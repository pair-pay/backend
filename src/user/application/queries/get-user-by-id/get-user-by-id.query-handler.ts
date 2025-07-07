import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../ports/user.repository';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { User } from 'src/user/domain/entities/user.entity';
import { Logger } from '@nestjs/common';
import { ResponseUserDto } from '../../dtos/response-user.dto';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  private readonly logger = new Logger(GetUserByIdQueryHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<ResponseUserDto> {
    this.logger.debug('Executing GetUserByIdQuery');

    const user = await this.userRepository.findById(query.id);

    this.logger.debug(`User found: ${JSON.stringify(user.toPrimitives())}`);

    return new ResponseUserDto(
      user.id,
      user.name.value,
      user.image.value,
      user.createdAt,
      user.updatedAt,
    );
  }
}
