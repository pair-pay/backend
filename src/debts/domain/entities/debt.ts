import { DebtStatus } from '../constants/debt-status.constant';
import { DebtPrimitive } from '../primitives/debt.primitive';
import { AmountValueObject } from '../value-objects/debt-amount/debt-amount.value-object';
import { DebtStatusValueObject } from '../value-objects/debt-status/debt-status.value-object';

/**
 * Represents a debt between two users for a specific expense.
 */
export class Debt {
  /**
   * @param id Unique identifier for the debt
   * @param expenseId Reference to the related expense
   * @param fromUserId The user who owes the debt
   * @param toUserId The user who paid the expense
   * @param amount Amount owed
   * @param currency Currency of the debt
   * @param status Status of the debt ('pending' | 'paid')
   * @param createdAt Creation date
   * @param updatedAt Last update date
   */
  constructor(
    public readonly id: string,
    public readonly expenseId: string,
    public readonly fromUserId: string,
    public readonly toUserId: string,
    public readonly amount: AmountValueObject,
    public readonly status: DebtStatusValueObject,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  update(
    data: Partial<{
      amount: number;
      currency: string;
      status: string;
    }>,
  ): Debt {
    return new Debt(
      this.id,
      this.expenseId,
      this.fromUserId,
      this.toUserId,
      new AmountValueObject(
        data.amount ?? this.amount.value,
        data.currency ?? this.amount.currency,
      ),
      new DebtStatusValueObject(data.status ?? this.status.value),
      this.createdAt,
      new Date(),
    );
  }

  updateStatus(status: string): Debt {
    return new Debt(
      this.id,
      this.expenseId,
      this.fromUserId,
      this.toUserId,
      this.amount,
      new DebtStatusValueObject(status),
      this.createdAt,
      this.updatedAt,
    );
  }

  static fromPrimitives(primitives: DebtPrimitive): Debt {
    return new Debt(
      primitives.id,
      primitives.expenseId,
      primitives.fromUserId,
      primitives.toUserId,
      new AmountValueObject(primitives.amount, primitives.currency),
      new DebtStatusValueObject(primitives.status),
      new Date(primitives.createdAt),
      new Date(primitives.updatedAt),
    );
  }

  toPrimitives(): DebtPrimitive {
    return {
      id: this.id,
      expenseId: this.expenseId,
      fromUserId: this.fromUserId,
      toUserId: this.toUserId,
      amount: this.amount.value,
      currency: this.amount.currency,
      status: this.status.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
