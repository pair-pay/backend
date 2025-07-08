import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import { GroupRepository } from '../ports/group.repository';
import { Logger } from '@nestjs/common';
import { CreateGroupCommand } from './create-group.command';
import { Group } from 'src/groups/domain/group';
import { GroupFactory } from 'src/groups/domain/factories/group.factory';
import { randomUUID } from 'crypto';
import { GroupCreatedEvent } from 'src/groups/domain/events/group-created.event';
import { CreateMembershipCommand } from 'src/memberships/application/commands/create-member/create-member.command';

@CommandHandler(CreateGroupCommand)
export class CreateGroupCommandHandler
  implements ICommandHandler<CreateGroupCommand>
{
  private readonly logger = new Logger(CreateGroupCommandHandler.name);
  constructor(
    private readonly groupFactory: GroupFactory,
    private readonly groupRepository: GroupRepository,
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
  ) {}
  async execute(command: CreateGroupCommand): Promise<Group> {
    this.logger.debug('Executing CreateGroupCommand');

    const group = this.groupFactory.create({
      name: command.data.name,
      description: command.data.description ?? null,
    });

    this.eventBus.publish(new GroupCreatedEvent(group));

    const createdGroup = await this.groupRepository.create(group);

    if (command.data.createdByUserId) {
      await this.commandBus.execute(
        new CreateMembershipCommand(
          createdGroup.id,
          command.data.createdByUserId,
        ),
      );
    }

    return createdGroup;
  }
}
