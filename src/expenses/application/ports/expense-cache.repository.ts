import { Expense } from '../../domain/expense';

export abstract class ExpenseCacheRepository {
  public abstract get(key: string): Promise<Expense | null>;
  public abstract set(key: string, value: Expense, ttl?: number): Promise<void>;
  public abstract delete(key: string): Promise<void>;
  public abstract clear(): Promise<void>;
}
