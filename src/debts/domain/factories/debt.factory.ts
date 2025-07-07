import { randomUUID } from 'crypto';
import { Debt } from '../entities/debt';
import { AmountValueObject } from '../value-objects/debt-amount/debt-amount.value-object';
import { DebtStatusValueObject } from '../value-objects/debt-status/debt-status.value-object';
import { DebtStatus } from '../constants/debt-status.constant';

export class DebtFactory {
  create(data: {
    expenseId: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
    currency: string;
    status?: DebtStatus;
  }): Debt {
    return new Debt(
      randomUUID(),
      data.expenseId,
      data.fromUserId,
      data.toUserId,
      new AmountValueObject(data.amount, data.currency),
      new DebtStatusValueObject(data.status || DebtStatus.PENDING),
      new Date(),
      new Date(),
    );
  }
}
