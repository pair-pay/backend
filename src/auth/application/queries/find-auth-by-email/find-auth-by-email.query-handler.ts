import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAuthByEmailQuery } from './find-auth-by-email.query';
import { AuthRepository } from '../../ports/auth.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(FindAuthByEmailQuery)
export class FindAuthByEmailQueryHandler
  implements IQueryHandler<FindAuthByEmailQuery>
{
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(query: FindAuthByEmailQuery): Promise<Auth> {
    const auth = await this.authRepository.findByEmail(query.email);
    if (!auth) {
      throw new NotFoundException('Auth not found');
    }
    return auth;
  }
}
