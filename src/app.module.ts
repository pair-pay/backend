import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './shared/shared.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UsersInfrastructureModule } from './user/infrastructure/users-infrastructure.module';
import { UsersApplicationModule } from './user/application/users-application.module';
import { GroupsApplicationModule } from './groups/application/group-application.module';
import { GroupsInfrastructureModule } from './groups/infrastructure/groups-infrastructure.module';
import { MembershipsInfrastructureModule } from './memberships/infrastructure/memberships-infrastructure.module';
import { MembershipApplicationModule } from './memberships/application/membership-application.module';
import { ExpensesApplicationModule } from './expenses/application/expenses-application.module';
import { ExpensesInfrastructureModule } from './expenses/infrastructure/expenses-infrastructure.module';
import { NotificationApplicationModule } from './notification/application/notification-application.module';
import { NotificationsInfrastructureModule } from './notification/infrastructure/notifications-infrastructure.module';
import { DebtsInfrastructureModule } from './debts/infrastructure/debts-infrastructure.module';
import { DebtsApplicationModule } from './debts/application/debts-application.module';
import { AuthInfrastructureModule } from './auth/infrastructure/auth-infrastructure.module';
import { AuthApplicationModule } from './auth/application/services/auth-application.module';
import { PromptsApplicationModule } from './prompts/application/prompts-application.module';
import { PromptsInfrastructureModule } from './prompts/infrastructure/prompts-infrastructure.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 20,
        },
      ],
    }),
    CoreModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        UsersApplicationModule.withInfrastructure(
          UsersInfrastructureModule.use(
            options.databaseDriver,
            options.cacheDriver,
          ),
          options,
        ),
        GroupsApplicationModule.withInfrastructure(
          GroupsInfrastructureModule.use(
            options.databaseDriver,
            options.cacheDriver,
          ),
          options,
        ),
        MembershipApplicationModule.withInfrastructure(
          MembershipsInfrastructureModule.use(
            options.databaseDriver,
            options.cacheDriver,
          ),
          options,
        ),
        ExpensesApplicationModule.withInfrastructure(
          ExpensesInfrastructureModule.use(
            options.databaseDriver,
            options.cacheDriver,
          ),
          options,
        ),
        NotificationApplicationModule.withInfrastructure(
          NotificationsInfrastructureModule.use(options),
          options,
        ),
        DebtsApplicationModule.withInfrastructure(
          DebtsInfrastructureModule.use(
            options.databaseDriver,
            options.cacheDriver,
          ),
          options,
        ),
        AuthApplicationModule.withInfrastructure(
          AuthInfrastructureModule.use(
            options.databaseDriver,
            options.cacheDriver,
          ),
          options,
        ),
        PromptsApplicationModule.withInfrastructure(
          PromptsInfrastructureModule.use(
            options.databaseDriver,
            options.cacheDriver,
          ),
          options,
        ),
      ],
    };
  }
}
