import { ExpenseAmountUpdatedDebtIntegrationEventHandler } from './expense-amount-updated-integration.event-handler';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ExpenseAmountUpdatedIntegrationEvent } from 'src/expenses/application/events/expense-amount-updated.integration-event';
import { GetDebtsByExpenseIdQuery } from '../../queries/get-debts-by-expense-id/get-debts-by-expense-id.query';
import { UpdateDebtCommand } from '../../commands/update-debt/update-debt.command';

describe('ExpenseAmountUpdatedDebtIntegrationEventHandler', () => {
  let handler: ExpenseAmountUpdatedDebtIntegrationEventHandler;
  let queryBus: jest.Mocked<QueryBus>;
  let commandBus: jest.Mocked<CommandBus>;

  beforeEach(() => {
    queryBus = { execute: jest.fn() } as any;
    commandBus = { execute: jest.fn() } as any;
    handler = new ExpenseAmountUpdatedDebtIntegrationEventHandler(
      queryBus,
      commandBus,
    );
  });

  function createEvent(members: any) {
    return new ExpenseAmountUpdatedIntegrationEvent(
      'e1', // id
      'Expense name', // name
      100, // amount
      'EUR', // currency
      'desc', // description
      new Date(), // date
      'u1', // userId
      'group1', // groupId
      new Date(), // createdAt
      members, // members
    );
  }

  it('should update debts for each member', async () => {
    const event = createEvent({
      u2: { amount: 50, currency: 'EUR' },
      u3: { amount: 50, currency: 'EUR' },
    });
    queryBus.execute.mockResolvedValue([
      { id: 'd1', fromUserId: 'u2', status: { value: 'pending' } },
      { id: 'd2', fromUserId: 'u3', status: { value: 'pending' } },
    ]);
    commandBus.execute.mockResolvedValue(undefined);
    await handler.handle(event);
    expect(queryBus.execute).toHaveBeenCalledWith(
      expect.any(GetDebtsByExpenseIdQuery),
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(2);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(UpdateDebtCommand),
    );
  });

  it('should propagate errors from QueryBus', async () => {
    const event = createEvent({});
    queryBus.execute.mockRejectedValue(new Error('fail'));
    await expect(handler.handle(event)).rejects.toThrow('fail');
  });

  it('should propagate errors from CommandBus', async () => {
    const event = createEvent({
      u2: { amount: 50, currency: 'EUR' },
    });
    queryBus.execute.mockResolvedValue([
      { id: 'd1', fromUserId: 'u2', status: { value: 'pending' } },
    ]);
    commandBus.execute.mockRejectedValue(new Error('fail'));
    await expect(handler.handle(event)).rejects.toThrow('fail');
  });
});
