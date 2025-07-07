import { Prompt } from '../../entities/prompt.entity';

export class PromptDeletedEvent {
  constructor(public readonly prompt: Prompt) {}
}
