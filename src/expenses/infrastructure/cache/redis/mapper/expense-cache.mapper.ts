import { Expense } from 'src/expenses/domain/expense';
import { ExpenseRedisCacheEntity } from '../entities/expense-cache.entity';

/**
 * Mapper class to convert between Trip domain objects and Redis cache entities
 */
export class ExpenseRedisCacheMapper {
  /**
   * Converts a Redis cache entity to a Trip domain object
   * @param entity The Redis cache entity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: ExpenseRedisCacheEntity): Expense {
    return Expense.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to a Redis cache entity
   * @param trip The Trip domain object to convert
   * @returns A Redis cache entity
   */
  static toPersistence(expense: Expense): ExpenseRedisCacheEntity {
    return expense.toPrimitives();
  }
}
