import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAuthByIdQuery } from './find-auth-by-id.query';
import { AuthRepository } from '../../ports/auth.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(FindAuthByIdQuery)
export class FindAuthByIdQueryHandler
  implements IQueryHandler<FindAuthByIdQuery>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindAuthByIdQuery): Promise<Auth> {
    const auth = await this.authRepository.findById(query.id);
    if (!auth) {
      throw new NotFoundException('Auth not found');
    }
    return auth;
  }
}
