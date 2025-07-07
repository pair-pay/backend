import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../ports/user.repository';
import { Logger } from '@nestjs/common';
import { UpdateUserCommand } from './update-user.command';
// import { UserUpdatedEvent } from 'src/users/domain/events/user-updated.event';
import { User } from 'src/user/domain/entities/user.entity';
import { UserFactory } from 'src/user/domain/factories/user.factory';
import { UserUpdatedEvent } from 'src/user/domain/events/user-updated.event';
import { UserNotFoundException } from 'src/user/domain/exceptions/user-not-found.exception';
import { ResponseUserDto } from '../dtos/response-user.dto';

/**
 * Command handler responsible for updating existing users
 */
@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  private readonly logger = new Logger(UpdateUserCommandHandler.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<ResponseUserDto> {
    this.logger.debug('Executing UpdateUserCommand');

    const userToUpdate = await this.userRepository.findById(command.id);

    if (!userToUpdate) throw new UserNotFoundException(command.id);

    const user = userToUpdate.update(command.data);

    const userUpdated = await this.userRepository.update(user);

    this.eventBus.publish(new UserUpdatedEvent(userUpdated));

    return new ResponseUserDto(
      userUpdated.id,
      userUpdated.name.value,
      userUpdated.image.value,
      userUpdated.createdAt,
      userUpdated.updatedAt,
    );
  }
}
