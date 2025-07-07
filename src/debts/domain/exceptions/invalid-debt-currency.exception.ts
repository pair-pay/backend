import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidCurrencyException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
