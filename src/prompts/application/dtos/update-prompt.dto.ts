import { PromptDescriptionValueObject } from 'src/prompts/domain/value-objects/prompt-description/prompt-description.value-object';
import { PromptNameValueObject } from 'src/prompts/domain/value-objects/prompt-name/prompt-name.value-object';
import { PromptTemplateValueObject } from 'src/prompts/domain/value-objects/prompt-template/prompt-template.value-object';

export class UpdatePromptDto {
  name?: PromptNameValueObject;
  template?: PromptTemplateValueObject;
  description?: PromptDescriptionValueObject;
  isDefault?: boolean;
}
