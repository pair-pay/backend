import { Column, Entity, PrimaryColumn, Index } from 'typeorm';

@Entity('prompts')
export class PromptTypeOrmEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Index()
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Index()
  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'varchar', nullable: false })
  template: string;

  @Column({ type: 'uuid', nullable: true })
  parentId?: string;

  @Column({ type: 'boolean', nullable: false })
  isDefault: boolean;

  @Column({ type: 'integer', nullable: false })
  version: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
