export class ExpenseRedisCacheEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly description: string,
    public readonly date: Date,
    public readonly paidByUserId: string,
    public readonly groupId: string,
    public readonly splitType: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
