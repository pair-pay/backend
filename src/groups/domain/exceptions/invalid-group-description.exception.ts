import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidGroupDescriptionException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
