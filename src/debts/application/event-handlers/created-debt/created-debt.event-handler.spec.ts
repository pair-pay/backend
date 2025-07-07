import { CreatedDebtEventHandler } from './created-debt.event-handler';
import { EventBus } from '@nestjs/cqrs';
import { CreatedDebtEvent } from 'src/debts/domain/events/created-debt/created-debt.event';
import { CreatedDebtIntegrationEvent } from '../../events/created-debt.integration-event';

describe('CreatedDebtEventHandler', () => {
  let handler: CreatedDebtEventHandler;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    eventBus = { publish: jest.fn() } as any;
    handler = new CreatedDebtEventHandler(eventBus);
  });

  it('should publish CreatedDebtIntegrationEvent', () => {
    const event = new CreatedDebtEvent({
      id: '1',
      expenseId: 'e1',
      fromUserId: 'u1',
      toUserId: 'u2',
      amount: { value: 100, currency: 'EUR' },
      status: { value: 'pending' },
      createdAt: new Date(),
    } as any);
    handler.handle(event);
    expect(eventBus.publish).toHaveBeenCalledWith(
      expect.any(CreatedDebtIntegrationEvent),
    );
  });

  it('should propagate errors from EventBus', () => {
    eventBus.publish.mockImplementation(() => {
      throw new Error('fail');
    });
    const event = new CreatedDebtEvent({
      id: '1',
      expenseId: 'e1',
      fromUserId: 'u1',
      toUserId: 'u2',
      amount: { value: 100, currency: 'EUR' },
      status: { value: 'pending' },
      createdAt: new Date(),
    } as any);
    expect(() => handler.handle(event)).toThrow('fail');
  });
});
