import { Auth } from 'src/auth/domain/entities/auth.entity';

export abstract class AuthCacheRepository {
  abstract set(key: string, value: Auth, ttl?: number): Promise<void>;
  abstract get(key: string): Promise<Auth | null>;
  abstract delete(key: string): Promise<void>;
  abstract clear(): Promise<void>;
}
