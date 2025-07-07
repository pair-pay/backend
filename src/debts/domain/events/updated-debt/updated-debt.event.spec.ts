import { UpdatedDebtEvent } from './updated-debt.event';

describe('UpdatedDebtEvent', () => {
  it('should assign debt property', () => {
    const debt = { id: '1' } as any;
    const event = new UpdatedDebtEvent(debt);
    expect(event.debt).toBe(debt);
  });
});
