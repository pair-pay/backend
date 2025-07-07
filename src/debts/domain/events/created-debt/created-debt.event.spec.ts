import { CreatedDebtEvent } from './created-debt.event';

describe('CreatedDebtEvent', () => {
  it('should assign debt property', () => {
    const debt = { id: '1' } as any;
    const event = new CreatedDebtEvent(debt);
    expect(event.debt).toBe(debt);
  });
});
