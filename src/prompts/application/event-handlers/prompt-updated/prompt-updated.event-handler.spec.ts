import { PromptUpdatedEventHandler } from './prompt-updated.event-handler';
import { PromptUpdatedEvent } from '../../../domain/events/prompt-updated/prompt-updated.event';

describe('PromptUpdatedEventHandler', () => {
  it('should be defined and handle should not throw', async () => {
    const handler = new PromptUpdatedEventHandler();
    const event = {
      prompt: { toPrimitives: () => ({}) },
    } as unknown as PromptUpdatedEvent;
    await expect(handler.handle(event)).resolves.not.toThrow();
  });
});
