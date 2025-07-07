import { Prompt } from './prompt.entity';
import { PromptNameValueObject } from '../value-objects/prompt-name/prompt-name.value-object';
import { PromptTemplateValueObject } from '../value-objects/prompt-template/prompt-template.value-object';
import { PromptVersionValueObject } from '../value-objects/prompt-version/prompt-version.value-object';
import { PromptDescriptionValueObject } from '../value-objects/prompt-description/prompt-description.value-object';
import { InvalidPromptException } from '../exceptions/invalid-prompt.exception';
import { PromptPrimitive } from '../primitives/prompt.primitive';

/**
 * @file Unit tests for the Prompt domain entity.
 */

describe('Prompt', () => {
  const primitive: PromptPrimitive = {
    id: 'prompt-1',
    name: 'Test Prompt',
    template: 'Hello {{name}}!',
    version: 1,
    isDefault: false,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    parentId: undefined,
    description: 'A test prompt',
  };

  it('should create a Prompt from primitives', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    expect(prompt).toBeInstanceOf(Prompt);
    expect(prompt.id).toBe(primitive.id);
    expect(prompt.name.value).toBe('test-prompt'); // formatted
    expect(prompt.template.value).toBe('hello-{{name}}!'); // formatted
    expect(prompt.version.value).toBe(primitive.version);
    expect(prompt.isDefault).toBe(primitive.isDefault);
    expect(prompt.createdAt.toISOString()).toBe(primitive.createdAt);
    expect(prompt.updatedAt.toISOString()).toBe(primitive.updatedAt);
    expect(prompt.parentId).toBeUndefined();
    expect(prompt.description?.value).toBe('a-test-prompt'); // formatted
  });

  it('should convert a Prompt to primitives', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    const result = prompt.toPrimitives();
    expect(result).toEqual({
      ...primitive,
      name: 'test-prompt',
      template: 'hello-{{name}}!',
      description: 'a-test-prompt',
    });
  });

  it('should compare two Prompts with equals', () => {
    const prompt1 = Prompt.fromPrimitives(primitive);
    const prompt2 = Prompt.fromPrimitives({ ...primitive });
    expect(prompt1.equals(prompt2)).toBe(true);
    const prompt3 = Prompt.fromPrimitives({ ...primitive, id: 'other-id' });
    expect(prompt1.equals(prompt3)).toBe(false);
  });

  it('should clone a Prompt with a new id', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    const clone = prompt.clone('new-id');
    expect(clone).toBeInstanceOf(Prompt);
    expect(clone.id).toBe('new-id');
    expect(clone.name.value).toBe(prompt.name.value);
  });

  it('should set a new parentId', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    const withParent = prompt.setParent('parent-123');
    expect(withParent.parentId).toBe('parent-123');
    expect(withParent.id).toBe(prompt.id);
  });

  it('should increment version and update updatedAt', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    const incremented = prompt.incrementVersion();
    expect(incremented.version.value).toBe(prompt.version.value + 1);
    expect(incremented.updatedAt.getTime()).toBeGreaterThan(
      prompt.updatedAt.getTime(),
    );
  });

  it('should set prompt as default and update updatedAt', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    const asDefault = prompt.setDefault();
    expect(asDefault.isDefault).toBe(true);
    expect(asDefault.updatedAt.getTime()).toBeGreaterThan(
      prompt.updatedAt.getTime(),
    );
  });

  it('should update prompt fields', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    const updated = prompt.update({
      name: 'Updated Name',
      template: 'Hi {{user}}!',
      description: 'Updated desc',
      isDefault: true,
    });
    expect(updated.name.value).toBe('updated-name');
    expect(updated.template.value).toBe('hi-{{user}}!');
    expect(updated.description?.value).toBe('updated-desc');
    expect(updated.isDefault).toBe(true);
    expect(updated.updatedAt.getTime()).toBeGreaterThan(
      prompt.updatedAt.getTime(),
    );
  });

  it('should keep original values if update is called with no name, template, isDefault or description', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    const updated = prompt.update({});
    expect(updated.name.value).toBe(prompt.name.value);
    expect(updated.template.value).toBe(prompt.template.value);
    expect(updated.isDefault).toBe(prompt.isDefault);
    expect(updated.description?.value).toBe(prompt.description?.value);
  });

  it('should parse variables from template', () => {
    const prompt = Prompt.fromPrimitives({
      ...primitive,
      template: 'Hello {{name}} and {{surname}}!',
    });
    expect(prompt.parseVariables()).toEqual(['name', 'surname']);
  });

  it('should throw InvalidPromptException if default prompt has parentId', () => {
    const prompt = Prompt.fromPrimitives({
      ...primitive,
      isDefault: true,
      parentId: 'parent-1',
    });
    expect(() => prompt.validate()).toThrow(InvalidPromptException);
  });

  it('should return the version value object with getVersion', () => {
    const prompt = Prompt.fromPrimitives(primitive);
    const versionVO = prompt.getVersion();
    expect(versionVO).toBeInstanceOf(Object);
    expect(versionVO.value).toBe(primitive.version);
  });

  it('should set description as undefined if not provided in fromPrimitives', () => {
    const primitiveWithoutDesc = { ...primitive };
    delete primitiveWithoutDesc.description;
    const prompt = Prompt.fromPrimitives(primitiveWithoutDesc);
    expect(prompt.description).toBeUndefined();
  });

  it('should return undefined for description in toPrimitives if not present', () => {
    const primitiveWithoutDesc = { ...primitive };
    delete primitiveWithoutDesc.description;
    const prompt = Prompt.fromPrimitives(primitiveWithoutDesc);
    const result = prompt.toPrimitives();
    expect(result.description).toBeUndefined();
  });
});
