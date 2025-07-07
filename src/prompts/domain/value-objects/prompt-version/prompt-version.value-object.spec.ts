import { PromptVersionValueObject } from './prompt-version.value-object';

/**
 * @file Unit tests for the PromptVersionValueObject.
 */

describe('PromptVersionValueObject', () => {
  it('should create a valid value object', () => {
    const vo = new PromptVersionValueObject(2);
    expect(vo.value).toBe(2);
  });

  it('should throw if version is less than 1', () => {
    expect(() => new PromptVersionValueObject(0)).toThrow();
    expect(() => new PromptVersionValueObject(-5)).toThrow();
  });

  it('should compare two value objects with equals', () => {
    const vo1 = new PromptVersionValueObject(3);
    const vo2 = new PromptVersionValueObject(3);
    expect(vo1.equals(vo2)).toBe(true);
    const vo3 = new PromptVersionValueObject(4);
    expect(vo1.equals(vo3)).toBe(false);
  });

  it('should return the value as string with toString', () => {
    const vo = new PromptVersionValueObject(5);
    expect(vo.toString()).toBe('5');
  });

  it('should return the value as json with toJson', () => {
    const vo = new PromptVersionValueObject(7);
    expect(vo.toJson()).toEqual({ value: 7 });
  });

  it('should increment the version', () => {
    const vo = new PromptVersionValueObject(10);
    expect(vo.incrementVersion()).toBe(11);
  });
});
