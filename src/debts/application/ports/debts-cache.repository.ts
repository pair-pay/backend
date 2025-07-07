import { Debt } from 'src/debts/domain/entities/debt';

export abstract class DebtsCacheRepository {
  public abstract get(key: string): Promise<Debt | null>;
  public abstract set(key: string, value: Debt): Promise<void>;
  public abstract delete(key: string): Promise<void>;
  public abstract clear(): Promise<void>;
}
