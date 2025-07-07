export class GetExpenseByUserIdQuery {
  constructor(
    public readonly userId: string,
    public readonly from?: Date,
    public readonly to?: Date,
  ) {}
}
