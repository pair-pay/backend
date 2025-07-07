import { SPLIT_TYPES } from 'src/expenses/domain/constants/split-types.constant';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('debts')
export class DebtTypeOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  expenseId: string;

  @Column({ type: 'uuid' })
  fromUserId: string;

  @Column({ type: 'uuid' })
  toUserId: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
