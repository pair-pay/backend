export interface ExpensePrimitive {
  id: string;
  name: string;
  amount: number;
  currency: string;
  description: string;
  date: Date;
  paidByUserId: string;
  groupId: string;
  splitType: string;
  createdAt: Date;
  updatedAt: Date;
}
