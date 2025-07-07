import { CreateExpenseDto } from '../dtos/create-expense.dto';

export class CreateExpenseCommand {
  constructor(public readonly data: CreateExpenseDto) {}
}
