import { ExpenseCreatedDebtIntegrationEventHandler } from './expense-created-integration.event-handler';
import { DebtsService } from '../../services/debt.service';
import { ExpenseCreatedIntegrationEvent } from 'src/expenses/application/events/expense-created.integration-event';
import { CreateDebtCommand } from '../../commands/create-debt/create-debt.command';

describe('ExpenseCreatedDebtIntegrationEventHandler', () => {
  let handler: ExpenseCreatedDebtIntegrationEventHandler;
  let debtsService: jest.Mocked<DebtsService>;

  beforeEach(() => {
    debtsService = { create: jest.fn() } as any;
    handler = new ExpenseCreatedDebtIntegrationEventHandler(debtsService);
  });

  function createEvent(userId: string, members: any) {
    return new ExpenseCreatedIntegrationEvent(
      'e1', // id
      'Expense name', // name
      100, // amount
      'EUR', // currency
      'desc', // description
      new Date(), // date
      userId, // userId
      'group1', // groupId
      new Date(), // createdAt
      members, // members
    );
  }

  it('should create debts for each member except the payer', async () => {
    const event = createEvent('u1', {
      u1: { amount: 0, currency: 'EUR' },
      u2: { amount: 50, currency: 'EUR' },
      u3: { amount: 50, currency: 'EUR' },
    });
    debtsService.create.mockResolvedValue(undefined);
    await handler.handle(event);
    expect(debtsService.create).toHaveBeenCalledTimes(2);
    expect(debtsService.create).toHaveBeenCalledWith(
      expect.any(CreateDebtCommand),
    );
  });

  it('should propagate errors from DebtsService', async () => {
    const event = createEvent('u1', {
      u1: { amount: 0, currency: 'EUR' },
      u2: { amount: 50, currency: 'EUR' },
    });
    debtsService.create.mockRejectedValue(new Error('fail'));
    await expect(handler.handle(event)).rejects.toThrow('fail');
  });
});
