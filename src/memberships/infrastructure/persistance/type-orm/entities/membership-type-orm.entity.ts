import { Column, Entity, PrimaryColumn, Index } from 'typeorm';

@Entity('memberships')
export class MembershipTypeOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Index()
  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Index()
  @Column({ type: 'uuid', nullable: false })
  groupId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
