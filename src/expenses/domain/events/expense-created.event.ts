import { Expense } from '../expense';

export class ExpenseCreatedEvent {
  constructor(
    public readonly expense: Expense,
    public readonly members: Record<
      string,
      { amount: number; currency: string }
    >,
  ) {}
}
