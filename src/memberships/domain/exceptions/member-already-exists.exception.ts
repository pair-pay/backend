import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class MembershipAlreadyExistsException extends DomainException {
  constructor(userId: string) {
    super(`User ${userId} is already added`);
  }
}
