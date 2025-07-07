import { Debt } from '../../../domain/entities/debt';
import { DebtResponseDto } from '../dto/debt-response.dto';

export class DebtHttpMapper {
  static toResponseDto(debt: Debt): DebtResponseDto {
    return {
      id: debt.id,
      expenseId: debt.expenseId,
      fromUserId: debt.fromUserId,
      toUserId: debt.toUserId,
      amount: Number(debt.amount.value),
      currency: debt.amount.currency,
      status: debt.status.value,
      createdAt: debt.createdAt.toISOString(),
      updatedAt: debt.updatedAt.toISOString(),
    };
  }
}
