export class GetDebtsByUserIdQuery {
  constructor(
    public readonly userId: string,
    public readonly fromDate?: Date,
    public readonly toDate?: Date,
  ) {}
}
