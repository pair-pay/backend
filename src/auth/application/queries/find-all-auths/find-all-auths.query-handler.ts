import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { FindAllAuthsQuery } from './find-all-auths.query';
import { AuthRepository } from '../../ports/auth.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { NotFoundException } from '@nestjs/common';
import { ResponseAuthDto } from '../../dtos/response-auth.dto';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';

@QueryHandler(FindAllAuthsQuery)
export class FindAllAuthsQueryHandler
  implements IQueryHandler<FindAllAuthsQuery>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: FindAllAuthsQuery): Promise<ResponseAuthDto[]> {
    const auths = await this.authRepository.findAll();

    let responseAuths: ResponseAuthDto[] = [];

    for (const auth of auths) {
      const user = await this.queryBus.execute(
        new GetUserByIdQuery(auth.userId),
      );
      responseAuths.push(
        new ResponseAuthDto(
          auth.id,
          auth.userId,
          auth.email.value,
          auth.accessToken.value,
          auth.refreshToken.value,
          auth.isActive,
          auth.role.value,
          auth.firstLogin.toISOString(),
          auth.lastLogin.toISOString(),
          auth.createdAt.toISOString(),
          auth.updatedAt.toISOString(),
          user,
          auth.accessToken.expiresIn,
        ),
      );
    }
    return responseAuths;
  }
}
