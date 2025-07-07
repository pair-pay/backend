import { Expense } from 'src/expenses/domain/expense';
import { ExpenseInMemoryEntity } from '../entities/expense-in-memory.entity';
import { User } from 'src/user/domain/entities/user.entity';

/**
 * Mapper class responsible for transforming between User domain objects and UserEntity persistence objects.
 */
export class ExpenseInMemoryMapper {
  /**
   * Converts a TripInMemoryEntity from the persistence layer to a Trip domain object
   * @param entity - The TripInMemoryEntity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: ExpenseInMemoryEntity): Expense {
    return Expense.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to a TripInMemoryEntity for persistence
   * @param trip - The Trip domain object to convert
   * @returns A TripInMemoryEntity for persistence
   */
  static toPersistence(expense: Expense): ExpenseInMemoryEntity {
    return expense.toPrimitives();
  }
}
