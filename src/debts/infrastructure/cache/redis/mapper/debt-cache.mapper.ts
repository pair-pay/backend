import { DebtRedisCacheEntity } from '../entities/debt-cache.entity';
import { Debt } from 'src/debts/domain/entities/debt';

/**
 * Mapper class to convert between Trip domain objects and Redis cache entities
 */
export class DebtRedisCacheMapper {
  /**
   * Converts a Redis cache entity to a Trip domain object
   * @param entity The Redis cache entity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: DebtRedisCacheEntity): Debt {
    return Debt.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to a Redis cache entity
   * @param trip The Trip domain object to convert
   * @returns A Redis cache entity
   */
  static toPersistence(debt: Debt): DebtRedisCacheEntity {
    return debt.toPrimitives();
  }
}
