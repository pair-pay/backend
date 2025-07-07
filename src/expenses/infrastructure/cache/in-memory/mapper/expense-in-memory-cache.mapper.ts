import { Expense } from 'src/expenses/domain/expense';
import { ExpenseInMemoryCacheEntity } from '../entities/expense-in-memory-cache.entity';

/**
 * Mapper class to convert between Trip domain objects and in-memory cache entities
 */
export class ExpenseInMemoryCacheMapper {
  /**
   * Converts an in-memory cache entity to a Trip domain object
   * @param entity The in-memory cache entity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: ExpenseInMemoryCacheEntity): Expense {
    return Expense.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to an in-memory cache entity
   * @param trip The Trip domain object to convert
   * @returns An in-memory cache entity
   */
  static toPersistence(expense: Expense): ExpenseInMemoryCacheEntity {
    return expense.toPrimitives();
  }
}
