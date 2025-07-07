import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { MembershipRepository } from '../../ports/membership.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { DeleteMembershipCommand } from './delete-membership.command';
import { ResponseMembershipDto } from 'src/memberships/application/dtos/response-membership.dto';

@CommandHandler(DeleteMembershipCommand)
export class DeleteMembershipCommandHandler
  implements ICommandHandler<DeleteMembershipCommand>
{
  private readonly logger = new Logger(DeleteMembershipCommandHandler.name);

  constructor(private readonly membershipRepository: MembershipRepository) {}

  async execute(
    command: DeleteMembershipCommand,
  ): Promise<ResponseMembershipDto> {
    this.logger.debug('Executing DeleteMembershipCommand');

    const membership = await this.membershipRepository.findById(command.id);

    if (!membership) throw new NotFoundException('Membership not found');

    //TODO: Remove the member from the group
    const deletedMembership = await this.membershipRepository.delete(
      membership.id,
    );

    //this.eventBus.publish(new MembershipRemovedEvent(updatedMembership));

    return new ResponseMembershipDto(
      deletedMembership.id,
      deletedMembership.createdAt,
      deletedMembership.updatedAt,
      [],
      [],
    );
  }
}
