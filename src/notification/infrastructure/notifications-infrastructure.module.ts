/**
 * NotificationsInfrastructureModule wires up notification providers.
 */
import { Module } from '@nestjs/common';
import { NotificationService } from '../application/notification.service';
import { NotificationProvider } from '../application/ports/notification-provider.interface';
import { DiscordNotificationProvider } from './providers/discord/discord-notification.provider';
import { GoogleChatNotificationProvider } from './providers/google-chat-notification.provider';
import { ApplicationBootstrapOptions } from '../../common/interfaces/application-bootstrap-options.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { DiscordNotificationMapper } from './providers/discord/mapper/discord-notification.mapper';

export const DISCORD_NOTIFICATION_PROVIDER = 'DISCORD_NOTIFICATION_PROVIDER';
export const GOOGLE_CHAT_NOTIFICATION_PROVIDER =
  'GOOGLE_CHAT_NOTIFICATION_PROVIDER';

@Module({})
export class NotificationsInfrastructureModule {
  static use(options: ApplicationBootstrapOptions) {
    const providers = this.selectProviders(options);
    return {
      module: NotificationsInfrastructureModule,
      providers,
      exports: [...providers],
    };
  }

  private static selectProviders(options: ApplicationBootstrapOptions) {
    const providers: any[] = [];
    const notificationProviders: NotificationProvider[] = [];

    if (options.notificationProviders?.includes('discord')) {
      providers.push({
        provide: DISCORD_NOTIFICATION_PROVIDER,
        useClass: DiscordNotificationProvider,
      });
      notificationProviders.push({
        send: async (payload) => {
          // Aquí se podría inyectar el provider real si se necesita lógica extra
          return new DiscordNotificationProvider(
            new HttpService(),
            new ConfigService(),
            new DiscordNotificationMapper(),
          ).send(payload);
        },
      });
    }
    if (options.notificationProviders?.includes('google-chat')) {
      providers.push({
        provide: GOOGLE_CHAT_NOTIFICATION_PROVIDER,
        useClass: GoogleChatNotificationProvider,
      });
      notificationProviders.push({
        send: async (payload) => {
          return new GoogleChatNotificationProvider().send(payload);
        },
      });
    }

    // Asegurarse de que notificationProviders siempre sea un array
    const safeNotificationProviders = notificationProviders ?? [];

    providers.push({
      provide: NotificationService,
      useFactory: () => new NotificationService(safeNotificationProviders),
    });

    return providers;
  }
}
