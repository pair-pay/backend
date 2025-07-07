/**
 * NotificationModule is the root module for notification logic.
 */
import { Module, DynamicModule } from '@nestjs/common';
import { NotificationApplicationModule } from './application/notification-application.module';
import { NotificationsInfrastructureModule } from './infrastructure/notifications-infrastructure.module';
import { ApplicationBootstrapOptions } from '../common/interfaces/application-bootstrap-options.interface';
import { NotificationDomainModule } from './domain/notification-domain.module';

@Module({
  imports: [NotificationApplicationModule],
  exports: [NotificationApplicationModule],
})
export class NotificationModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: NotificationModule,
      imports: [
        NotificationDomainModule,
        NotificationApplicationModule,
        NotificationsInfrastructureModule.use(options),
      ],

      exports: [
        NotificationApplicationModule,
        NotificationsInfrastructureModule,
      ],
    };
  }
}
