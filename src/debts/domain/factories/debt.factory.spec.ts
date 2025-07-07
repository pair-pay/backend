import { DebtFactory } from './debt.factory';
import { DebtStatus } from '../constants/debt-status.constant';

describe('DebtFactory', () => {
  it('should create a Debt with default status', () => {
    const factory = new DebtFactory();
    const debt = factory.create({
      expenseId: 'e1',
      fromUserId: 'u1',
      toUserId: 'u2',
      amount: 100,
      currency: 'EUR',
    });
    expect(debt).toHaveProperty('id');
    expect(debt.status.value).toBe(DebtStatus.PENDING);
  });

  it('should create a Debt with custom status', () => {
    const factory = new DebtFactory();
    const debt = factory.create({
      expenseId: 'e1',
      fromUserId: 'u1',
      toUserId: 'u2',
      amount: 100,
      currency: 'EUR',
      status: DebtStatus.PAID,
    });
    expect(debt.status.value).toBe(DebtStatus.PAID);
  });
});
