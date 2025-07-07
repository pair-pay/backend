import { User } from '../../domain/entities/user.entity';

export abstract class UserCacheRepository {
  public abstract get(key: string): Promise<User | null>;
  public abstract set(key: string, value: User, ttl?: number): Promise<void>;
  public abstract delete(key: string): Promise<void>;
  public abstract clear(): Promise<void>;
}
