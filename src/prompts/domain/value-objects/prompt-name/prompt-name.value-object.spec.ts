import { PromptNameValueObject } from './prompt-name.value-object';

/**
 * @file Unit tests for the PromptNameValueObject.
 */

describe('PromptNameValueObject', () => {
  it('should create a valid value object and format the value', () => {
    const vo = new PromptNameValueObject('  My Prompt Name  ');
    expect(vo.value).toBe('my-prompt-name');
  });

  it('should throw if name is too short', () => {
    expect(() => new PromptNameValueObject('ab')).toThrow();
  });

  it('should compare two value objects with equals', () => {
    const vo1 = new PromptNameValueObject('PromptName');
    const vo2 = new PromptNameValueObject('promptname');
    expect(vo1.equals(vo2)).toBe(true);
    const vo3 = new PromptNameValueObject('Another');
    expect(vo1.equals(vo3)).toBe(false);
  });

  it('should return the value as string with toString', () => {
    const vo = new PromptNameValueObject('Test Name');
    expect(vo.toString()).toBe('test-name');
  });

  it('should return the value as json with toJson', () => {
    const vo = new PromptNameValueObject('Test Name');
    expect(vo.toJson()).toEqual({ value: 'test-name' });
  });
});
