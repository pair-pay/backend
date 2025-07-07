import { Prompt } from '../entities/prompt.entity';
import { randomUUID } from 'crypto';
import { PromptNameValueObject } from '../value-objects/prompt-name/prompt-name.value-object';
import { PromptTemplateValueObject } from '../value-objects/prompt-template/prompt-template.value-object';
import { PromptVersionValueObject } from '../value-objects/prompt-version/prompt-version.value-object';
import { PromptDescriptionValueObject } from '../value-objects/prompt-description/prompt-description.value-object';

export class PromptFactory {
  public create(data: {
    name: string;
    template: string;
    description: string;
    isDefault: boolean;
  }): Prompt {
    return new Prompt(
      randomUUID(),
      new PromptNameValueObject(data.name),
      new PromptTemplateValueObject(data.template),
      new PromptVersionValueObject(1),
      data.isDefault,
      new Date(),
      new Date(),
      undefined,
      new PromptDescriptionValueObject(data.description),
    );
  }
}
