export interface DebtPrimitive {
  id: string;
  expenseId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
