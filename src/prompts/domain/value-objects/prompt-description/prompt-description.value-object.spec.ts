import { PromptDescriptionValueObject } from './prompt-description.value-object';

/**
 * @file Unit tests for the PromptDescriptionValueObject.
 */

describe('PromptDescriptionValueObject', () => {
  it('should create a valid value object and format the value', () => {
    const vo = new PromptDescriptionValueObject('  My Description  ');
    expect(vo.value).toBe('my-description');
  });

  it('should throw if description is too short', () => {
    expect(() => new PromptDescriptionValueObject('ab')).toThrow();
  });

  it('should compare two value objects with equals', () => {
    const vo1 = new PromptDescriptionValueObject('Description');
    const vo2 = new PromptDescriptionValueObject('description');
    expect(vo1.equals(vo2)).toBe(true);
    const vo3 = new PromptDescriptionValueObject('Another');
    expect(vo1.equals(vo3)).toBe(false);
  });

  it('should return the value as string with toString', () => {
    const vo = new PromptDescriptionValueObject('Test Desc');
    expect(vo.toString()).toBe('test-desc');
  });

  it('should return the value as json with toJson', () => {
    const vo = new PromptDescriptionValueObject('Test Desc');
    expect(vo.toJson()).toEqual({ value: 'test-desc' });
  });
});
