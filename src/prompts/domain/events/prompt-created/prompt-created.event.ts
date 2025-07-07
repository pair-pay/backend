import { Prompt } from '../../entities/prompt.entity';

export class PromptCreatedEvent {
  constructor(public readonly prompt: Prompt) {}
}
