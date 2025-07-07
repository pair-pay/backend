import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class IsNotAMemberException extends DomainException {
  constructor(groupId: string, userId: string) {
    super(`User ${userId} is not a member of group ${groupId}`);
  }
}
