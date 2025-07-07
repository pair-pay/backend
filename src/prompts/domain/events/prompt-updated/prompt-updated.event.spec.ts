import { Prompt } from '../../entities/prompt.entity';
import { PromptDescriptionValueObject } from '../../value-objects/prompt-description/prompt-description.value-object';
import { PromptNameValueObject } from '../../value-objects/prompt-name/prompt-name.value-object';
import { PromptTemplateValueObject } from '../../value-objects/prompt-template/prompt-template.value-object';
import { PromptVersionValueObject } from '../../value-objects/prompt-version/prompt-version.value-object';
import { PromptUpdatedEvent } from './prompt-updated.event';

describe('PromptUpdatedEvent', () => {
  it('should store the prompt instance', () => {
    const prompt = new Prompt(
      'prompt-1',
      new PromptNameValueObject('prompt-name'),
      new PromptTemplateValueObject('prompt-template'),
      new PromptVersionValueObject(1),
      false,
      new Date('2023-01-01T00:00:00.000Z'),
      new Date('2023-01-02T00:00:00.000Z'),
      'parent-prompt-id',
      new PromptDescriptionValueObject('prompt-description'),
    );
    const event = new PromptUpdatedEvent(prompt);
    expect(event.prompt).toBe(prompt);
  });
});
