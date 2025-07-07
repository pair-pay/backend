import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class MembershipNotFoundException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
