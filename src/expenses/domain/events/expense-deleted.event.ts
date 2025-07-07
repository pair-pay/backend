import { Expense } from '../expense';

export class ExpenseDeletedEvent {
  constructor(public readonly expense: Expense) {}
}
