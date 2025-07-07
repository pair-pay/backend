import { Auth } from 'src/auth/domain/entities/auth.entity';

export abstract class AuthRepository {
  public abstract findAll(): Promise<Auth[]>;
  public abstract findById(id: string): Promise<Auth>;
  public abstract findByEmail(email: string): Promise<Auth>;
  /**
   * Finds an Auth aggregate by its refresh token.
   * @param refreshToken The refresh token string
   * @returns Promise<Auth | null> The Auth aggregate or null if not found
   */
  public abstract findByRefreshToken(
    refreshToken: string,
  ): Promise<Auth | null>;
  public abstract create(auth: Auth): Promise<Auth>;
  public abstract update(auth: Auth): Promise<Auth>;
  public abstract delete(auth: Auth): Promise<Auth>;
}
