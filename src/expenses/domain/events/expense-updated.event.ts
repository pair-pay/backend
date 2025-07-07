import { Expense } from '../expense';

export class ExpenseUpdatedEvent {
  constructor(public readonly expense: Expense) {}
}
