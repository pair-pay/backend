import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../ports/user.repository';
import { Logger } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
// import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';
import { User } from 'src/user/domain/entities/user.entity';
import { UserFactory } from 'src/user/domain/factories/user.factory';
import { randomUUID } from 'node:crypto';
import { UserCreatedEvent } from 'src/user/domain/events/user-created.event';
import { ResponseUserDto } from '../dtos/response-user.dto';

/**
 * Command handler responsible for creating new users
 */
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly logger = new Logger(CreateUserCommandHandler.name);

  /**
   * Creates an instance of CreateUserCommandHandler
   * @param userRepository - Repository for user persistence operations
   * @param eventBus - Event bus for publishing domain events
   */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Executes the create user command
   * @param command - Command containing data to create
   * @returns Created User domain object
   */
  async execute(command: CreateUserCommand): Promise<ResponseUserDto> {
    this.logger.debug('Executing CreateUserCommand');

    const user = this.userFactory.create({
      name: command.data.name,
      image: command.data.image,
    });

    this.logger.debug(`User created: ${JSON.stringify(user.toPrimitives())}`);

    const userCreated = await this.userRepository.create(user);

    this.eventBus.publish(new UserCreatedEvent(userCreated));

    this.logger.debug(
      `User created: ${JSON.stringify(userCreated.toPrimitives())}`,
    );

    return new ResponseUserDto(
      userCreated.id,
      userCreated.name.value,
      userCreated.image.value,
      userCreated.createdAt,
      userCreated.updatedAt,
    );
  }
}
