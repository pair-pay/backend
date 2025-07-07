import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class AuthAlreadyExistsException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
