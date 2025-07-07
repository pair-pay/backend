import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtTypeOrmEntity } from './entities/debt-type-orm.entity';
import { TypeOrmDebtsRepository } from './repositories/debt-type-orm.repository';
import { DebtsRepository } from 'src/debts/application/ports/debts.repository';

@Module({
  // Here we are importing the entities that we want to use in the repository
  imports: [TypeOrmModule.forFeature([DebtTypeOrmEntity])],
  providers: [
    {
      provide: DebtsRepository,
      useClass: TypeOrmDebtsRepository,
    },
  ],
  exports: [DebtsRepository],
})
export class DebtsTypeOrmPersistanceModule {}
