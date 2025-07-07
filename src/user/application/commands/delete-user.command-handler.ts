import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../ports/user.repository';
import { Logger } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
// import { UserDeletedEvent } from 'src/users/domain/events/user-deleted.event';
import { User } from 'src/user/domain/entities/user.entity';
import { UserDeletedEvent } from 'src/user/domain/events/user-deleted.event';
import { ResponseUserDto } from '../dtos/response-user.dto';

/**
 * Command handler responsible for deleting existing users
 */
@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  private readonly logger = new Logger(DeleteUserCommandHandler.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<ResponseUserDto> {
    this.logger.debug('Executing DeleteUserCommand');

    const userToDelete = await this.userRepository.findById(command.id);

    const userDeleted = await this.userRepository.delete(userToDelete.id);

    this.eventBus.publish(new UserDeletedEvent(userDeleted));

    return new ResponseUserDto(
      userDeleted.id,
      userDeleted.name.value,
      userDeleted.image.value,
      userDeleted.createdAt,
      userDeleted.updatedAt,
    );
  }
}
