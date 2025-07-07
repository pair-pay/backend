import { GroupFactory } from './group.factory';

describe('GroupFactory', () => {
  it('should create a group', () => {
    const data = { id: 'test-id', name: 'test-name' };
    const group = GroupFactory.create(data);
    expect(group).toBeDefined();
    expect(group.id).toBe(data.id);
  });
});
