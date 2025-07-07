import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { GroupRepository } from '../ports/group.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { Group } from 'src/groups/domain/group';
import { DeleteGroupCommand } from './delete-group.command';
import { GroupDeletedEvent } from 'src/groups/domain/events/group-deleted.event';

@CommandHandler(DeleteGroupCommand)
export class DeleteGroupCommandHandler
  implements ICommandHandler<DeleteGroupCommand>
{
  private readonly logger = new Logger(DeleteGroupCommandHandler.name);
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: DeleteGroupCommand): Promise<Group> {
    this.logger.debug('Executing DeleteGroupsCommand');

    const groupToDelete = await this.groupRepository.findById(command.id);

    if (!groupToDelete) throw new NotFoundException('Group not found');

    await this.groupRepository.delete(groupToDelete.id);

    this.eventBus.publish(new GroupDeletedEvent(groupToDelete));

    return groupToDelete;
  }
}
