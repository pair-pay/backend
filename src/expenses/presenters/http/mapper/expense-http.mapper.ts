import { Injectable, Logger } from '@nestjs/common';
import { Expense } from '../../../domain/expense';
import { ExpenseResponseDto } from '../dto/expense-response.dto';

@Injectable()
export class ExpenseHttpMapper {
  static toResponseDto(expense: Expense): ExpenseResponseDto {
    return {
      id: expense.id,
      name: expense.name.value,
      amount: expense.amount.value,
      currency: expense.amount.currency,
      description: expense.description,
      date: expense.date.toISOString(),
      paidByUserId: expense.paidByUserId,
      groupId: expense.groupId,
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
      splitType: expense.splitType.value,
    };
  }
}
