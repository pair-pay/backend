import { PromptFactory } from './prompt.factory';
import { Prompt } from '../entities/prompt.entity';

describe('PromptFactory', () => {
  it('should create a Prompt with provided name, template, description, and isDefault', () => {
    const factory = new PromptFactory();
    const name = 'prompt-name';
    const template = 'prompt-template';
    const description = 'prompt-description';
    const isDefault = false;
    const prompt = factory.create({ name, template, description, isDefault });

    expect(prompt).toBeInstanceOf(Prompt);
    expect(prompt.getName().value).toBe(name);
    expect(prompt.getTemplate().value).toBe(template);
    expect(prompt.getDescription()?.value).toBe(description);
    expect(prompt.isDefault).toBe(isDefault);
    expect(typeof prompt.id).toBe('string');
    expect(prompt.createdAt).toBeInstanceOf(Date);
    expect(prompt.updatedAt).toBeInstanceOf(Date);
  });
});
