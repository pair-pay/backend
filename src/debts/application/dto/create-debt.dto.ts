export class CreateDebtDto {
  expenseId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: string;
}
