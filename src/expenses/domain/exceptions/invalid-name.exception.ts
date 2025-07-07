import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidNameException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
