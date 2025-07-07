import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('groups')
export class GroupsTypeOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
