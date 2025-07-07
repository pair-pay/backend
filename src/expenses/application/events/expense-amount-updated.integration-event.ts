export class ExpenseAmountUpdatedIntegrationEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly description: string,
    public readonly date: Date,
    public readonly userId: string,
    public readonly groupId: string,
    public readonly createdAt: Date,
    public readonly members: Record<
      string,
      { amount: number; currency: string }
    >,
  ) {}
}
