export class GetDebtsByExpenseIdAndUserIdQuery {
  constructor(
    public readonly expenseId: string,
    public readonly userId: string,
    public readonly fromDate?: Date,
    public readonly toDate?: Date,
  ) {}
}
