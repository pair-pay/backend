import { DomainException } from '../../../shared/domain/exceptions/domain.exception';

export class ExpenseNotFoundException extends DomainException {
  constructor(id: string) {
    super(`User with id ${id} not found`);
  }
}
