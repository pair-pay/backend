export class DebtRedisCacheEntity {
  constructor(
    public readonly id: string,
    public readonly expenseId: string,
    public readonly fromUserId: string,
    public readonly toUserId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
