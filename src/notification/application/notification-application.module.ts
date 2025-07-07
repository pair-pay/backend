/**
 * NotificationApplicationModule wires up notification event handlers and services.
 */
import { DynamicModule, Module, Type } from '@nestjs/common';
import { UserCreatedNotificationEventHandler } from './event-handlers/user-created-notification.event-handler';
import { UsersInfrastructureModule } from 'src/user/infrastructure/users-infrastructure.module';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { NotificationDomainModule } from '../domain/notification-domain.module';
import { HttpModule } from '@nestjs/axios';
import { GroupCreatedNotificationEventHandler } from './event-handlers/group-created-notification.event-handler';
import { ExpenseCreatedNotificationEventHandler } from './event-handlers/expense-created-notification.event-handler';

const eventHandlers = [
  UserCreatedNotificationEventHandler,
  GroupCreatedNotificationEventHandler,
  ExpenseCreatedNotificationEventHandler,
];

@Module({
  imports: [HttpModule, NotificationDomainModule],
  providers: [...eventHandlers],
})
export class NotificationApplicationModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
    options: ApplicationBootstrapOptions,
  ) {
    return {
      module: NotificationApplicationModule,
      imports: [
        infrastructureModule,
        UsersInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
    };
  }
}
