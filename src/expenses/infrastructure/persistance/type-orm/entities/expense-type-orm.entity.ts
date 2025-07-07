import { SPLIT_TYPES } from 'src/expenses/domain/constants/split-types.constant';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('expenses')
export class ExpenseTypeOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Index()
  @Column({ type: 'uuid' })
  paidByUserId: string;

  @Index()
  @Column({ type: 'uuid' })
  groupId: string;

  @Column({ type: 'varchar', default: SPLIT_TYPES.EQUAL })
  splitType: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
