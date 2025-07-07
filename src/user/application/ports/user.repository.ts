import { User } from 'src/user/domain/entities/user.entity';

export abstract class UserRepository {
  public abstract findAll(): Promise<User[]>;
  public abstract findById(id: string): Promise<User>;
  public abstract create(user: User): Promise<User>;
  public abstract update(user: User): Promise<User>;
  public abstract delete(id: string): Promise<User>;
}
