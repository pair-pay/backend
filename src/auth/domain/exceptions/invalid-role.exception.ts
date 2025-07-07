import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidAuthRoleException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
