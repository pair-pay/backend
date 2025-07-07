import { randomUUID } from 'node:crypto';
import { Expense } from '../expense';
import { AmountValueObject } from '../value-objects/amount.value-object';
import { Injectable } from '@nestjs/common';
import { NameValueObject } from '../value-objects/name.value-object';
import { SplitTypeValueObject } from '../value-objects/split-type.value-object';

/**
 * Factory class for creating User domain objects
 */
@Injectable()
export class ExpenseFactory {
  /**
   * Creates a new User domain object
   * @param data - The data to create the User from
   * @returns A new User domain object
   */
  create(data: {
    name: string;
    amount: number;
    currency: string;
    description: string;
    date: Date;
    paidByUserId: string;
    groupId: string;
    splitType: string;
  }): Expense {
    return new Expense(
      randomUUID(),
      new NameValueObject(data.name),
      new AmountValueObject(data.amount, data.currency),
      data.description,
      data.date,
      data.paidByUserId,
      data.groupId,
      new SplitTypeValueObject(data.splitType),
      new Date(),
      new Date(),
    );
  }
}
