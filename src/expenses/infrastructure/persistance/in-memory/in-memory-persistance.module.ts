import { Module } from '@nestjs/common';
import { ExpensesInMemoryRepository } from './repositories/expense-in-memory.repository';
import { ExpenseRepository } from 'src/expenses/application/ports/expense.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: ExpenseRepository,
      useClass: ExpensesInMemoryRepository,
    },
  ],
  exports: [ExpenseRepository],
})
export class ExpensesInMemoryPersistanceModule {}
