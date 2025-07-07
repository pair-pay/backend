import { User } from './user.entity';
import { NameValueObject } from '../value-objects/name.value-object';
import { UserImageValueObject } from '../value-objects/user-image/user-image.value-object';
import { UserInvalidImageException } from '../exceptions/user-invalid-image.exception';

describe('User', () => {
  it('should create a user with https image', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject('https://example.com/image.png'),
      new Date(),
      new Date(),
    );
    expect(user).toBeDefined();
    expect(user.id).toBe('test-id');
    expect(user.name.value).toBe('test-name');
    expect(user.image.value).toBe('https://example.com/image.png');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a user with http image', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject('http://example.com/image.png'),
      new Date(),
      new Date(),
    );
    expect(user.image.value).toBe('http://example.com/image.png');
  });

  it('should create a user with data-uri image', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
      ),
      new Date(),
      new Date(),
    );
    expect(user.image.value).toBe(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    );
  });

  it('should create a user with null image', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject(null),
      new Date(),
      new Date(),
    );
    expect(user.image.value).toBeNull();
  });

  it('should create a user with undefined image', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject(undefined),
      new Date(),
      new Date(),
    );
    expect(user.image.value).toBeUndefined();
  });

  it('should throw if image is not valid', () => {
    expect(
      () =>
        new User(
          'test-id',
          new NameValueObject('test-name'),
          new UserImageValueObject('ftp://example.com/image.png'),
          new Date(),
          new Date(),
        ),
    ).toThrow(UserInvalidImageException);
  });

  it('should update name and image', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject('https://example.com/image.png'),
      new Date('2023-01-01T00:00:00Z'),
      new Date('2023-01-01T00:00:00Z'),
    );
    const updated = user.update({
      name: 'new-name',
      image: 'http://example.com/new.png',
    });
    expect(updated.name.value).toBe('new-name');
    expect(updated.image.value).toBe('http://example.com/new.png');
    expect(updated.id).toBe(user.id);
    expect(updated.createdAt).toEqual(user.createdAt);
    expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(
      user.updatedAt.getTime(),
    );
  });

  it('should update only name', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject('https://example.com/image.png'),
      new Date('2023-01-01T00:00:00Z'),
      new Date('2023-01-01T00:00:00Z'),
    );
    const updated = user.update({ name: 'new-name' });
    expect(updated.name.value).toBe('new-name');
    expect(updated.image.value).toBe('https://example.com/image.png');
  });

  it('should update only image', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject('https://example.com/image.png'),
      new Date('2023-01-01T00:00:00Z'),
      new Date('2023-01-01T00:00:00Z'),
    );
    const updated = user.update({ image: 'data:image/png;base64,AAA' });
    expect(updated.name.value).toBe('test-name');
    expect(updated.image.value).toBe('data:image/png;base64,AAA');
  });

  it('should create a user from primitives', () => {
    const primitives = {
      id: 'test-id',
      name: 'test-name',
      image: 'https://example.com/image.png',
      createdAt: new Date('2023-01-01T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2023-01-02T00:00:00.000Z').toISOString(),
    };
    const user = User.fromPrimitives(primitives);
    expect(user.id).toBe('test-id');
    expect(user.name.value).toBe('test-name');
    expect(user.image.value).toBe('https://example.com/image.png');
    expect(user.createdAt).toEqual(new Date('2023-01-01T00:00:00.000Z'));
    expect(user.updatedAt).toEqual(new Date('2023-01-02T00:00:00.000Z'));
  });

  it('should convert user to primitives', () => {
    const user = new User(
      'test-id',
      new NameValueObject('test-name'),
      new UserImageValueObject('https://example.com/image.png'),
      new Date('2023-01-01T00:00:00.000Z'),
      new Date('2023-01-02T00:00:00.000Z'),
    );
    const primitives = user.toPrimitives();
    expect(primitives).toEqual({
      id: 'test-id',
      name: 'test-name',
      image: 'https://example.com/image.png',
      createdAt: new Date('2023-01-01T00:00:00.000Z').toISOString(),
      updatedAt: new Date('2023-01-02T00:00:00.000Z').toISOString(),
    });
  });
});
