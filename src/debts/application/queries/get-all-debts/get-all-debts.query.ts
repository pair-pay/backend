export class GetAllDebtsQuery {
  constructor(
    public readonly fromDate?: Date,
    public readonly toDate?: Date,
  ) {}
}
