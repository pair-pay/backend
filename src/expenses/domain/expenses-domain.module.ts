import { Module } from '@nestjs/common';
import { ExpenseFactory } from './factories/expense.factory';
import { ExpenseSplitService } from './services/expense-split.service';

@Module({
  providers: [ExpenseFactory, ExpenseSplitService],
  exports: [ExpenseFactory, ExpenseSplitService],
})
export class ExpensesDomainModule {}
