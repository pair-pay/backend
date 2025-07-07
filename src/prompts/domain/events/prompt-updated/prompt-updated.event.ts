import { Prompt } from '../../entities/prompt.entity';

export class PromptUpdatedEvent {
  constructor(public readonly prompt: Prompt) {}
}
