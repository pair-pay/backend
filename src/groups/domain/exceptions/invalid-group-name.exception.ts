import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidGroupNameException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
