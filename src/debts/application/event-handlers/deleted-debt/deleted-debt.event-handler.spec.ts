import { DeletedDebtEventHandler } from './deleted-debt.event-handler';
import { EventBus } from '@nestjs/cqrs';
import { DeletedDebtEvent } from 'src/debts/domain/events/deleted-debt/deleted-debt.event';

describe('DeletedDebtEventHandler', () => {
  let handler: DeletedDebtEventHandler;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    eventBus = { publish: jest.fn() } as any;
    handler = new DeletedDebtEventHandler(eventBus);
  });

  it('should log and not throw on handle', () => {
    const event = new DeletedDebtEvent({ id: '1' } as any);
    expect(() => handler.handle(event)).not.toThrow();
  });
});
