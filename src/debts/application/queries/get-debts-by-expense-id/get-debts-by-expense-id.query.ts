export class GetDebtsByExpenseIdQuery {
  constructor(
    public readonly expenseId: string,
    public readonly fromDate?: Date,
    public readonly toDate?: Date,
  ) {}
}
