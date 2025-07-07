import { UserFactory } from './user.factory';

describe('UserFactory', () => {
  it('should create a user', () => {
    const data = {
      id: 'test-id',
      // Add your test data here
    };

    const user = UserFactory.create(data);

    expect(user).toBeDefined();
    expect(user.id).toBe(data.id);
  });
});
