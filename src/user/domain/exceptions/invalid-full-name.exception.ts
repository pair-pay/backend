import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidFullNameException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
