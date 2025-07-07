export class UpdateExpenseAmountCommand {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly currency: string,
  ) {}
}
