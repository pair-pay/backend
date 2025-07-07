import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidActionException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
