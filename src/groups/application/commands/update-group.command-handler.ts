import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { GroupRepository } from '../ports/group.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { UpdateGroupCommand } from './update-group.command';
import { Group } from 'src/groups/domain/group';
import { GroupFactory } from 'src/groups/domain/factories/group.factory';
import { GroupUpdatedEvent } from 'src/groups/domain/events/group-updated.event';

@CommandHandler(UpdateGroupCommand)
export class UpdateGroupCommandHandler
  implements ICommandHandler<UpdateGroupCommand>
{
  private readonly logger = new Logger(UpdateGroupCommandHandler.name);

  constructor(
    private readonly groupFactory: GroupFactory,
    private readonly groupRepository: GroupRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateGroupCommand): Promise<Group> {
    this.logger.debug('Executing UpdateGroupCommand');

    const groupToUpdate = await this.groupRepository.findById(command.id);

    if (!groupToUpdate) throw new NotFoundException('Group not found');

    const group = groupToUpdate.update(command.data);

    const updatedGroup = await this.groupRepository.update(group);

    this.eventBus.publish(new GroupUpdatedEvent(updatedGroup));
    return updatedGroup;
  }
}
