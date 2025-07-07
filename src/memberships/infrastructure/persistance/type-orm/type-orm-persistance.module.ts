import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipTypeOrmEntity } from './entities/membership-type-orm.entity';
import { MembershipTypeOrmRepository } from './repositories/membership-type-orm.repository';
import { MembershipRepository } from 'src/memberships/application/ports/membership.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipTypeOrmEntity])],
  providers: [
    {
      provide: MembershipRepository,
      useClass: MembershipTypeOrmRepository,
    },
  ],
  exports: [MembershipRepository],
})
export class TypeOrmPersistanceModule {}
