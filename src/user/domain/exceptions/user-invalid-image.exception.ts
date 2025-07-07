import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class UserInvalidImageException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
