import { Debt } from 'src/debts/domain/entities/debt';
import { DebtTypeOrmEntity } from '../entities/debt-type-orm.entity';

export class TypeOrmDebtMapper {
  static toDomain(entity: DebtTypeOrmEntity): Debt {
    return Debt.fromPrimitives(entity);
  }

  static toPersistence(debt: Debt): DebtTypeOrmEntity {
    return debt.toPrimitives();
  }
}
