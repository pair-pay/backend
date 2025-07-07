import { DomainException } from '../../../shared/domain/exceptions/domain.exception';

export class InvalidUserException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
