import { UserHttpMapper } from './user-http.mapper';
import { User } from '../../../domain/entities/user.entity';
import { NameValueObject } from '../../../domain/value-objects/name.value-object';

describe('UserHttpMapper', () => {
  it('should map User to UserResponseDto', () => {
    const user = new User(
      'u1',
      new NameValueObject('Test User'),
      new Date('2023-01-01T00:00:00.000Z'),
      new Date('2023-01-02T00:00:00.000Z'),
    );
    const dto = UserHttpMapper.toResponseDto(user);
    expect(dto).toEqual({
      id: 'u1',
      name: 'test user',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    });
  });
});
