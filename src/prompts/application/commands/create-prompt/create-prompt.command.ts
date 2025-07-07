import { CreatePromptDto } from '../../dtos/create-prompt.dto';

export class CreatePromptCommand {
  constructor(public readonly prompt: CreatePromptDto) {}
}
