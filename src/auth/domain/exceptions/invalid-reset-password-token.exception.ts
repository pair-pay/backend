import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidResetPasswordTokenException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
