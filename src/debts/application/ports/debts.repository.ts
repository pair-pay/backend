import { DebtStatus } from 'src/debts/domain/constants/debt-status.constant';
import { Debt } from 'src/debts/domain/entities/debt';

export abstract class DebtsRepository {
  public abstract findAll(fromDate?: Date, toDate?: Date): Promise<Debt[]>;
  public abstract findById(id: string): Promise<Debt | null>;
  public abstract findByExpenseId(
    expenseId: string,
    fromDate?: Date,
    toDate?: Date,
  ): Promise<Debt[]>;
  public abstract findByUserId(
    userId: string,
    fromDate?: Date,
    toDate?: Date,
  ): Promise<Debt[]>;
  public abstract findByExpenseIdAndUserId(
    expenseId: string,
    userId: string,
    fromDate?: Date,
    toDate?: Date,
  ): Promise<Debt | null>;
  public abstract findByExpenseIdAndUserIdAndStatus(
    expenseId: string,
    userId: string,
    status: string,
    fromDate?: Date,
    toDate?: Date,
  ): Promise<Debt[]>;
  public abstract create(debt: Debt): Promise<Debt>;
  public abstract update(debt: Debt): Promise<Debt>;
  public abstract delete(debt: Debt): Promise<Debt>;
}
