import { ExpensePrimitive } from './primitives/expense.primitive';
import { AmountValueObject } from './value-objects/amount.value-object';
import { NameValueObject } from './value-objects/name.value-object';
import { SplitTypeValueObject } from './value-objects/split-type.value-object';

export class Expense {
  constructor(
    public readonly id: string,
    public readonly name: NameValueObject,
    public readonly amount: AmountValueObject,
    public readonly description: string,
    public readonly date: Date,
    public readonly paidByUserId: string,
    public readonly groupId: string,
    public readonly splitType: SplitTypeValueObject,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  update(
    data: Partial<{
      name: string;
      amount: number;
      currency: string;
      description: string;
    }>,
  ): Expense {
    return new Expense(
      this.id,
      new NameValueObject(data.name ?? this.name.value),
      new AmountValueObject(
        data.amount ?? this.amount.value,
        data.currency ?? this.amount.currency,
      ),
      data.description ?? this.description,
      this.date,
      this.paidByUserId,
      this.groupId,
      this.splitType,
      this.createdAt,
      new Date(),
    );
  }

  static fromPrimitives(primitives: ExpensePrimitive): Expense {
    return new Expense(
      primitives.id,
      new NameValueObject(primitives.name),
      new AmountValueObject(primitives.amount, primitives.currency),
      primitives.description,
      new Date(primitives.date),
      primitives.paidByUserId,
      primitives.groupId,
      new SplitTypeValueObject(primitives.splitType),
      new Date(primitives.createdAt),
      new Date(primitives.updatedAt),
    );
  }

  toPrimitives(): ExpensePrimitive {
    return {
      id: this.id,
      name: this.name.value,
      amount: this.amount.value,
      currency: this.amount.currency,
      description: this.description,
      date: this.date,
      paidByUserId: this.paidByUserId,
      groupId: this.groupId,
      splitType: this.splitType.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
