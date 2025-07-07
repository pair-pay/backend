import { Module } from '@nestjs/common';
import { NotificationFactory } from './factories/notification.factory';

@Module({
  imports: [],
  providers: [NotificationFactory],
  exports: [NotificationFactory],
})
export class NotificationDomainModule {}
