import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidPasswordException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
