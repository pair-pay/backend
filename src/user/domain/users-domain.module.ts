import { Module } from '@nestjs/common';
import { UserFactory } from './factories/user.factory';

@Module({
  providers: [UserFactory],
  exports: [UserFactory],
})
export class UsersDomainModule {}
