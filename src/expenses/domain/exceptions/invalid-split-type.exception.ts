import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidSplitTypeException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
