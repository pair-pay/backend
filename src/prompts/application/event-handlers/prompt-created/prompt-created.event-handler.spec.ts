import { PromptCreatedEventHandler } from './prompt-created.event-handler';
import { PromptCreatedEvent } from '../../../domain/events/prompt-created/prompt-created.event';

describe('PromptCreatedEventHandler', () => {
  it('should be defined and handle should not throw', async () => {
    const handler = new PromptCreatedEventHandler();
    const event = {
      prompt: { toPrimitives: () => ({}) },
    } as unknown as PromptCreatedEvent;
    await expect(handler.handle(event)).resolves.not.toThrow();
  });
});
