import { DebtHttpMapper } from './debt-http.mapper';
import { Debt } from '../../../domain/entities/debt';

describe('DebtHttpMapper', () => {
  it('should map Debt to DebtResponseDto', () => {
    const debt = {
      id: 'd1',
      expenseId: 'e1',
      fromUserId: 'u1',
      toUserId: 'u2',
      amount: { value: 50, currency: 'USD' },
      status: { value: 'pending' },
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
    } as unknown as Debt;
    const dto = DebtHttpMapper.toResponseDto(debt);
    expect(dto).toEqual({
      id: 'd1',
      expenseId: 'e1',
      fromUserId: 'u1',
      toUserId: 'u2',
      amount: 50,
      currency: 'USD',
      status: 'pending',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
    });
  });
});
