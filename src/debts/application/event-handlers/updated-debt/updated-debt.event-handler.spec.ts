import { UpdatedDebtEventHandler } from './updated-debt.event-handler';
import { EventBus } from '@nestjs/cqrs';
import { UpdatedDebtEvent } from 'src/debts/domain/events/updated-debt/updated-debt.event';

describe('UpdatedDebtEventHandler', () => {
  let handler: UpdatedDebtEventHandler;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    eventBus = { publish: jest.fn() } as any;
    handler = new UpdatedDebtEventHandler(eventBus);
  });

  it('should log and not throw on handle', () => {
    const event = new UpdatedDebtEvent({ id: '1' } as any);
    expect(() => handler.handle(event)).not.toThrow();
  });
});
