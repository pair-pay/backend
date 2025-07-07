import { Module } from '@nestjs/common';
import { DebtFactory } from './factories/debt.factory';

@Module({
  providers: [DebtFactory],
  exports: [DebtFactory],
})
export class DebtsDomainModule {}
