import { CommandHandler, QueryBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { AuthRepository } from '../../ports/auth.repository';
import { UpdateAuthCommand } from './update-auth.command';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { AuthUpdatedEvent } from 'src/auth/domain/events/auth-updated/auth-updated.event';
import { EventBus } from '@nestjs/cqrs';
import { ResponseAuthDto } from '../../dtos/response-auth.dto';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';

@CommandHandler(UpdateAuthCommand)
export class UpdateAuthCommandHandler {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: UpdateAuthCommand): Promise<ResponseAuthDto> {
    const { id, data } = command;

    const auth = await this.authRepository.findById(id);
    if (!auth) {
      throw new NotFoundException('Auth not found');
    }

    const user = await this.queryBus.execute(new GetUserByIdQuery(auth.userId));
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedAuth = auth.update(data);

    const isUpdated = updatedAuth.equals(auth);
    if (!isUpdated)
      return new ResponseAuthDto(
        updatedAuth.id,
        updatedAuth.userId,
        updatedAuth.email.value,
        updatedAuth.accessToken.value,
        updatedAuth.refreshToken.value,
        updatedAuth.isActive,
        updatedAuth.role.value,
        updatedAuth.firstLogin.toISOString(),
        updatedAuth.lastLogin.toISOString(),
        updatedAuth.createdAt.toISOString(),
        updatedAuth.updatedAt.toISOString(),
        user,
        updatedAuth.accessToken.expiresIn,
      );

    await this.authRepository.update(updatedAuth);

    this.eventBus.publish(new AuthUpdatedEvent(updatedAuth));

    return new ResponseAuthDto(
      updatedAuth.id,
      updatedAuth.userId,
      updatedAuth.email.value,
      updatedAuth.accessToken.value,
      updatedAuth.refreshToken.value,
      updatedAuth.isActive,
      updatedAuth.role.value,
      updatedAuth.firstLogin.toISOString(),
      updatedAuth.lastLogin.toISOString(),
      updatedAuth.createdAt.toISOString(),
      updatedAuth.updatedAt.toISOString(),
      user,
      updatedAuth.accessToken.expiresIn,
    );
  }
}
