import { AuthRoles } from 'src/auth/domain/constants/auth-roles.constant';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class AuthTypeOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Index({ unique: true })
  @Column({ type: 'uuid' })
  userId: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', default: AuthRoles.USER })
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  firstLogin: Date;

  @Column({ type: 'timestamp' })
  lastLogin: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
