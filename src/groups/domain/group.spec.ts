import { NameValueObject } from './value-objects/group-name.value-object';
import { Group } from './group';

describe('Group', () => {
  it('should create a group', () => {
    const group = new Group('test-id', new NameValueObject('test-name'));
    expect(group).toBeDefined();
    expect(group.id).toBe('test-id');
    expect(group.name).toBe('test-name');
  });
});
