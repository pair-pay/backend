import { Group } from 'src/groups/domain/group';

export abstract class GroupRepository {
  public abstract findAll(): Promise<Group[]>;
  public abstract findById(id: string): Promise<Group>;
  public abstract create(group: Group): Promise<Group>;
  public abstract update(group: Group): Promise<Group>;
  public abstract delete(id: string): Promise<Group>;
}
