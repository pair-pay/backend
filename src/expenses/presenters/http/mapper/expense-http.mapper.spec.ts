import { ExpenseHttpMapper } from './expense-http.mapper';
import { Expense } from '../../../domain/expense';

describe('ExpenseHttpMapper', () => {
  it('should map Expense to ExpenseResponseDto', () => {
    const expense = {
      id: 'e1',
      name: { value: 'Test Expense' },
      amount: { value: 100, currency: 'USD' },
      description: 'A test expense',
      date: new Date('2023-01-01T00:00:00.000Z'),
      paidByUserId: 'u1',
      groupId: 'g1',
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
      splitType: { value: 'equal' },
    } as unknown as Expense;
    const dto = ExpenseHttpMapper.toResponseDto(expense);
    expect(dto).toEqual({
      id: 'e1',
      name: 'Test Expense',
      amount: 100,
      currency: 'USD',
      description: 'A test expense',
      date: '2023-01-01T00:00:00.000Z',
      paidByUserId: 'u1',
      groupId: 'g1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
      splitType: 'equal',
    });
  });
});
