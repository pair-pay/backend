import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsTypeOrmEntity } from './entities/groups-type-orm.entity';
import { GroupRepository } from 'src/groups/application/ports/group.repository';
import { GroupTypeOrmRepository } from './repositories/groups-type-orm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GroupsTypeOrmEntity])],
  providers: [
    {
      provide: GroupRepository,
      useClass: GroupTypeOrmRepository,
    },
  ],
  exports: [GroupRepository],
})
export class TypeOrmPersistanceModule {}
