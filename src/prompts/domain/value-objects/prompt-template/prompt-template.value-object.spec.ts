import { PromptTemplateValueObject } from './prompt-template.value-object';

/**
 * @file Unit tests for the PromptTemplateValueObject.
 */

describe('PromptTemplateValueObject', () => {
  it('should create a valid value object and format the value', () => {
    const vo = new PromptTemplateValueObject('  Hello {{name}}!  ');
    expect(vo.value).toBe('hello-{{name}}!');
  });

  it('should throw if template is too short', () => {
    expect(() => new PromptTemplateValueObject('ab')).toThrow();
  });

  it('should compare two value objects with equals', () => {
    const vo1 = new PromptTemplateValueObject('Hello {{name}}!');
    const vo2 = new PromptTemplateValueObject('hello {{name}}!');
    expect(vo1.equals(vo2)).toBe(true);
    const vo3 = new PromptTemplateValueObject('Hi {{user}}!');
    expect(vo1.equals(vo3)).toBe(false);
  });

  it('should return the value as string with toString', () => {
    const vo = new PromptTemplateValueObject('Test Template');
    expect(vo.toString()).toBe('test-template');
  });

  it('should return the value as json with toJson', () => {
    const vo = new PromptTemplateValueObject('Test Template');
    expect(vo.toJson()).toEqual({ value: 'test-template' });
  });

  it('should parse variables from template', () => {
    const vo = new PromptTemplateValueObject('Hello {{name}} and {{surname}}!');
    expect(vo.parseVariables()).toEqual(['name', 'surname']);
    const vo2 = new PromptTemplateValueObject('No variables here');
    expect(vo2.parseVariables()).toEqual([]);
  });
});
