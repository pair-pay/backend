import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseTypeOrmEntity } from './entities/expense-type-orm.entity';
import { ExpenseRepository } from 'src/expenses/application/ports/expense.repository';
import { TypeOrmExpensesRepository } from './repositories/expense-type-orm.repository';

@Module({
  // Here we are importing the entities that we want to use in the repository
  imports: [TypeOrmModule.forFeature([ExpenseTypeOrmEntity])],
  providers: [
    {
      provide: ExpenseRepository,
      useClass: TypeOrmExpensesRepository,
    },
  ],
  exports: [ExpenseRepository],
})
export class ExpensesTypeOrmPersistanceModule {}
