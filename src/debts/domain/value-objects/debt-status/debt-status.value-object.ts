import { DebtStatus } from '../../constants/debt-status.constant';
import { InvalidDebtStatusException } from '../../exceptions/invalid-debt-status.exception';

export class DebtStatusValueObject {
  constructor(public readonly value: string) {
    this.validate(value);
  }

  private validate(value: string): void {
    if (!Object.values(DebtStatus).includes(value as DebtStatus)) {
      throw new InvalidDebtStatusException('Invalid debt status');
    }
  }

  toJson(): string {
    return this.value;
  }
}
