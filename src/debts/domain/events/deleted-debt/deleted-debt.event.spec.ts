import { DeletedDebtEvent } from './deleted-debt.event';

describe('DeletedDebtEvent', () => {
  it('should assign debt property', () => {
    const debt = { id: '1' } as any;
    const event = new DeletedDebtEvent(debt);
    expect(event.debt).toBe(debt);
  });
});
