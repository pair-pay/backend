import { Prompt } from 'src/prompts/domain/entities/prompt.entity';

export class UpdatePromptCommand {
  constructor(
    public readonly id: string,
    public readonly prompt: Partial<{
      name: string;
      template: string;
      description: string;
      isDefault: boolean;
    }>,
  ) {}
}
