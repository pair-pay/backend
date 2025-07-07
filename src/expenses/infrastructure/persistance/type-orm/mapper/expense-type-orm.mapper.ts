import { Expense } from 'src/expenses/domain/expense';
import { ExpenseTypeOrmEntity } from '../entities/expense-type-orm.entity';

export class TypeOrmExpenseMapper {
  static toDomain(entity: ExpenseTypeOrmEntity): Expense {
    return Expense.fromPrimitives(entity);
  }

  static toPersistence(expense: Expense): ExpenseTypeOrmEntity {
    return expense.toPrimitives();
  }
}
