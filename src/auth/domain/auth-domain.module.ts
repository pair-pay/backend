import { Module } from '@nestjs/common';
import { AuthFactory } from './factories/auth.factory';

@Module({
  providers: [AuthFactory],
  exports: [AuthFactory],
})
export class AuthDomainModule {}
