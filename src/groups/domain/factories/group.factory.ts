import { randomUUID } from 'crypto';
import { Group } from '../group';
import { GroupDescriptionValueObject } from '../value-objects/group-description.value-object';
import { GroupNameValueObject } from '../value-objects/group-name.value-object';

export class GroupFactory {
  public create(data: { name: string; description: string }): Group {
    return new Group(
      randomUUID(),
      new GroupNameValueObject(data.name),
      new GroupDescriptionValueObject(data.description),
      new Date(),
      new Date(),
    );
  }
}
