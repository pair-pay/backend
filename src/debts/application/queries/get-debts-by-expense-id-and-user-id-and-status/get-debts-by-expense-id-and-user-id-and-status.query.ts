import { DebtStatus } from 'src/debts/domain/constants/debt-status.constant';

export class GetDebtsByExpenseIdAndUserIdAndStatusQuery {
  constructor(
    public readonly expenseId: string,
    public readonly userId: string,
    public readonly status: string,
    public readonly fromDate?: Date,
    public readonly toDate?: Date,
  ) {}
}
