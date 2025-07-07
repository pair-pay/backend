import { Expense } from 'src/expenses/domain/expense';

export abstract class ExpenseRepository {
  public abstract findAll(from?: Date, to?: Date): Promise<Expense[]>;
  public abstract findById(id: string): Promise<Expense>;
  public abstract findByUserId(
    userId: string,
    from?: Date,
    to?: Date,
  ): Promise<Expense[]>;
  public abstract findByGroupId(
    groupId: string,
    from?: Date,
    to?: Date,
  ): Promise<Expense[]>;
  public abstract create(expense: Expense): Promise<Expense>;
  public abstract update(expense: Expense): Promise<Expense>;
  public abstract delete(id: string): Promise<Expense>;
}
