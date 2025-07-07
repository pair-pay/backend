import { DebtInMemoryEntity } from '../entities/debt-in-memory.entity';
import { Debt } from 'src/debts/domain/entities/debt';

/**
 * Mapper class responsible for transforming between User domain objects and UserEntity persistence objects.
 */
export class DebtInMemoryMapper {
  /**
   * Converts a TripInMemoryEntity from the persistence layer to a Trip domain object
   * @param entity - The TripInMemoryEntity to convert
   * @returns A Trip domain object
   */
  static toDomain(entity: DebtInMemoryEntity): Debt {
    return Debt.fromPrimitives(entity);
  }

  /**
   * Converts a Trip domain object to a TripInMemoryEntity for persistence
   * @param trip - The Trip domain object to convert
   * @returns A TripInMemoryEntity for persistence
   */
  static toPersistence(debt: Debt): DebtInMemoryEntity {
    return debt.toPrimitives();
  }
}
