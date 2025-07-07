export class CreateExpenseDto {
  constructor(
    public readonly name: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly description: string,
    public readonly date: Date,
    public readonly paidByUserId: string,
    public readonly groupId: string,
    public readonly splitType: string,
  ) {}
}
