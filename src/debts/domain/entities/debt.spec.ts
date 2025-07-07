import { Debt } from './debt';
import { AmountValueObject } from '../value-objects/debt-amount/debt-amount.value-object';
import { DebtStatusValueObject } from '../value-objects/debt-status/debt-status.value-object';
import { DebtStatus } from '../constants/debt-status.constant';

describe('Debt', () => {
  const base = {
    id: '1',
    expenseId: '2',
    fromUserId: '3',
    toUserId: '4',
    amount: new AmountValueObject(100, 'EUR'),
    status: new DebtStatusValueObject(DebtStatus.PENDING),
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-02T00:00:00.000Z'),
  };

  it('should construct correctly', () => {
    const debt = new Debt(
      base.id,
      base.expenseId,
      base.fromUserId,
      base.toUserId,
      base.amount,
      base.status,
      base.createdAt,
      base.updatedAt,
    );
    expect(debt.id).toBe('1');
    expect(debt.amount.value).toBe(100);
    expect(debt.status.value).toBe(DebtStatus.PENDING);
  });

  it('should update amount and status', () => {
    const debt = new Debt(
      base.id,
      base.expenseId,
      base.fromUserId,
      base.toUserId,
      base.amount,
      base.status,
      base.createdAt,
      base.updatedAt,
    );
    const updated = debt.update({ amount: 200, status: DebtStatus.PAID });
    expect(updated.amount.value).toBe(200);
    expect(updated.status.value).toBe(DebtStatus.PAID);
    expect(updated.createdAt).toBe(base.createdAt);
    expect(updated.updatedAt.getTime()).toBeGreaterThan(
      base.updatedAt.getTime(),
    );
  });

  it('should keep original values when updating without specifying amount or status', () => {
    const debt = new Debt(
      base.id,
      base.expenseId,
      base.fromUserId,
      base.toUserId,
      base.amount,
      base.status,
      base.createdAt,
      base.updatedAt,
    );
    const updated = debt.update({});
    expect(updated.amount.value).toBe(base.amount.value);
    expect(updated.amount.currency).toBe(base.amount.currency);
    expect(updated.status.value).toBe(base.status.value);
    expect(updated.updatedAt.getTime()).toBeGreaterThan(
      base.updatedAt.getTime(),
    );
  });

  it('should update status only', () => {
    const debt = new Debt(
      base.id,
      base.expenseId,
      base.fromUserId,
      base.toUserId,
      base.amount,
      base.status,
      base.createdAt,
      base.updatedAt,
    );
    const updated = debt.updateStatus(DebtStatus.PAID);
    expect(updated.status.value).toBe(DebtStatus.PAID);
    expect(updated.amount.value).toBe(100);
  });

  it('should convert to and from primitives', () => {
    const debt = new Debt(
      base.id,
      base.expenseId,
      base.fromUserId,
      base.toUserId,
      base.amount,
      base.status,
      base.createdAt,
      base.updatedAt,
    );
    const primitives = debt.toPrimitives();
    expect(primitives).toMatchObject({
      id: '1',
      expenseId: '2',
      fromUserId: '3',
      toUserId: '4',
      amount: 100,
      currency: 'EUR',
      status: DebtStatus.PENDING,
    });
    const from = Debt.fromPrimitives({ ...primitives });
    expect(from).toBeInstanceOf(Debt);
    expect(from.amount.value).toBe(100);
    expect(from.status.value).toBe(DebtStatus.PENDING);
  });
});
