import { PromptDeletedEvent } from '../../../domain/events/prompt-deleted/prompt-deleted.event';
import { PromptDeletedEventHandler } from './prompt-deleted.event-handler';

describe('PromptDeletedEventHandler', () => {
  it('should be defined and handle should not throw', async () => {
    const handler = new PromptDeletedEventHandler();
    const event = {
      prompt: { toPrimitives: () => ({}) },
    } as unknown as PromptDeletedEvent;
    await expect(handler.handle(event)).resolves.not.toThrow();
  });
});
