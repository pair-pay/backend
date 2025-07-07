import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidAccessTokenException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
