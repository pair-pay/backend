import { DebtInMemoryCacheEntity } from '../entities/debt-in-memory-cache.entity';
import { Debt } from 'src/debts/domain/entities/debt';

/**
 * Mapper class to convert between Trip domain objects and in-memory cache entities
 */
export class DebtInMemoryCacheMapper {
  /**
   * Converts an in-memory cache entity to a Trip domain object
   * @param entity The in-memory cache entity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: DebtInMemoryCacheEntity): Debt {
    return Debt.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to an in-memory cache entity
   * @param trip The Trip domain object to convert
   * @returns An in-memory cache entity
   */
  static toPersistence(debt: Debt): DebtInMemoryCacheEntity {
    return debt.toPrimitives();
  }
}
