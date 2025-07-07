import { UserImageValueObject } from './user-image.value-object';
import { UserInvalidImageException } from '../../exceptions/user-invalid-image.exception';
import { Logger } from '@nestjs/common';

describe('UserImageValueObject', () => {
  // Mock del logger para evitar logs en consola
  beforeAll(() => {
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should accept a valid https url', () => {
    const value = 'https://example.com/image.png';
    const vo = new UserImageValueObject(value);
    expect(vo.value).toBe(value);
  });

  it('should accept a valid http url', () => {
    const value = 'http://example.com/image.png';
    const vo = new UserImageValueObject(value);
    expect(vo.value).toBe(value);
  });

  it('should accept a valid data-uri', () => {
    const value = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
    const vo = new UserImageValueObject(value);
    expect(vo.value).toBe(value);
  });

  it('should accept null', () => {
    const vo = new UserImageValueObject(null);
    expect(vo.value).toBeNull();
  });

  it('should accept undefined', () => {
    const vo = new UserImageValueObject(undefined);
    expect(vo.value).toBeUndefined();
  });

  it('should throw if value is not a string (number)', () => {
    expect(() => new UserImageValueObject(123 as any)).toThrow(
      UserInvalidImageException,
    );
  });

  it('should throw if value is not a string (object)', () => {
    expect(() => new UserImageValueObject({} as any)).toThrow(
      UserInvalidImageException,
    );
  });

  it('should throw if value is a string but not a valid url', () => {
    expect(
      () => new UserImageValueObject('ftp://example.com/image.png'),
    ).toThrow(UserInvalidImageException);
    expect(() => new UserImageValueObject('example.com/image.png')).toThrow(
      UserInvalidImageException,
    );
    expect(() => new UserImageValueObject('')).toThrow(
      UserInvalidImageException,
    );
  });

  it('equals should return true for same value', () => {
    const vo1 = new UserImageValueObject('https://example.com/image.png');
    const vo2 = new UserImageValueObject('https://example.com/image.png');
    expect(vo1.equals(vo2)).toBe(true);
  });

  it('equals should return false for different value', () => {
    const vo1 = new UserImageValueObject('https://example.com/image1.png');
    const vo2 = new UserImageValueObject('https://example.com/image2.png');
    expect(vo1.equals(vo2)).toBe(false);
  });

  it('toString should return the value', () => {
    const value = 'https://example.com/image.png';
    const vo = new UserImageValueObject(value);
    expect(vo.toString()).toBe(value);
  });

  it('toJson should return the value', () => {
    const value = 'https://example.com/image.png';
    const vo = new UserImageValueObject(value);
    expect(vo.toJson()).toBe(value);
  });
});
