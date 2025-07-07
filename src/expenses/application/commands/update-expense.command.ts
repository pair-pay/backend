import { UpdateExpenseDto } from '../dtos/update-expense.dto';

export class UpdateExpenseCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateExpenseDto,
  ) {}
}
