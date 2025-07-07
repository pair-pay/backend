import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { CreateMembershipCommand } from './create-member.command';
import { MembershipRepository } from '../../ports/membership.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/application/ports/user.repository';
import { Membership } from 'src/memberships/domain/entities/membership.entity';
import { GroupRepository } from 'src/groups/application/ports/group.repository';
import { MembershipFactory } from 'src/memberships/domain/factories/membership.factory';
import { MembershipAlreadyExistsException } from 'src/memberships/domain/exceptions/member-already-exists.exception';
import { MembershipCacheRepository } from '../../ports/membership-cache.repository';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { GetGroupByIdQuery } from 'src/groups/application/queries/get-group-by-id/get-group-by-id.query';
import { ResponseMembershipDto } from 'src/memberships/application/dtos/response-membership.dto';
import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';
import { ResponseGroupDto } from 'src/groups/application/dtos/response-group.dto';

@CommandHandler(CreateMembershipCommand)
export class CreateMembershipCommandHandler
  implements ICommandHandler<CreateMembershipCommand>
{
  private readonly logger = new Logger(CreateMembershipCommandHandler.name);

  constructor(
    private readonly membershipRepository: MembershipRepository,
    private readonly membershipFactory: MembershipFactory,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(
    command: CreateMembershipCommand,
  ): Promise<ResponseMembershipDto> {
    this.logger.debug('Executing CreateMembershipCommand');

    // 1. Check if the user exists
    const user: ResponseUserDto = await this.queryBus.execute(
      new GetUserByIdQuery(command.userId),
    );
    if (!user) throw new NotFoundException('User not found');

    // 2. Check if the group exists
    const group: ResponseGroupDto = await this.queryBus.execute(
      new GetGroupByIdQuery(command.groupId),
    );
    if (!group) throw new NotFoundException('Group not found');

    // 3. Check if the user is already a member of the group
    const existingMembership =
      await this.membershipRepository.findByGroupIdAndUserId(
        command.groupId,
        command.userId,
      );
    if (existingMembership)
      throw new MembershipAlreadyExistsException(command.userId);

    // 4. Create the membership
    const membership = this.membershipFactory.create({
      groupId: command.groupId,
      userId: command.userId,
    });

    // 5. Save the membership
    const createdMembership =
      await this.membershipRepository.create(membership);

    // TODO: Implement cache
    // 6. Save the membership in cache
    // await this.membershipCacheRepository.set(
    //   `membership:${command.groupId}:${command.userId}`,
    //   createdMembership,
    // );

    // TODO: Implement event bus
    //this.eventBus.publish(new GroupMemberAddedEvent(updatedGroup));

    return new ResponseMembershipDto(
      createdMembership.id,
      createdMembership.createdAt,
      createdMembership.updatedAt,
      [group],
      [user],
    );
  }
}
