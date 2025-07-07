import { PromptHttpMapper } from './prompt-http.mapper';
import { Prompt } from '../../../domain/entities/prompt.entity';
import { PromptNameValueObject } from '../../../domain/value-objects/prompt-name/prompt-name.value-object';
import { PromptTemplateValueObject } from '../../../domain/value-objects/prompt-template/prompt-template.value-object';
import { PromptVersionValueObject } from '../../../domain/value-objects/prompt-version/prompt-version.value-object';

describe('PromptHttpMapper', () => {
  it('should map Prompt to PromptResponseDto', () => {
    const prompt = new Prompt(
      'm1',
      new PromptNameValueObject('Prompt 1'),
      new PromptTemplateValueObject('Template 1'),
      new PromptVersionValueObject(1),
      false,
      new Date('2023-01-01T00:00:00.000Z'),
      new Date('2023-01-02T00:00:00.000Z'),
    );
    const dto = PromptHttpMapper.toResponseDto(prompt);
    expect(dto).toEqual({
      id: 'm1',
      name: 'Prompt 1',
      description: 'Template 1',
      template: 'Template 1',
      version: 1,
      isDefault: false,
      parentId: undefined,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    });
  });
});
