export class GetExpenseByGroupIdQuery {
  constructor(
    public readonly groupId: string,
    public readonly from?: Date,
    public readonly to?: Date,
  ) {}
}
