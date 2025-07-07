import { Logger } from '@nestjs/common';
import { NotificationProvider } from '../../../application/ports/notification-provider.interface';
import { NotificationPrimitive } from '../../../domain/primitives/notification.primitive';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DiscordNotificationMapper } from './mapper/discord-notification.mapper';

/**
 * DiscordNotificationProvider implements NotificationProvider for Discord channel.
 */
export class DiscordNotificationProvider implements NotificationProvider {
  private readonly logger = new Logger(DiscordNotificationProvider.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly discordNotificationMapper: DiscordNotificationMapper,
  ) {}

  async send(payload: NotificationPrimitive): Promise<void> {
    this.logger.debug(
      `[Discord] Sending notification: ${JSON.stringify(payload)}`,
    );

    const webhookUrl = this.configService.get('DISCORD_WEBHOOK_URL');
    if (!webhookUrl) {
      this.logger.error('DISCORD_WEBHOOK_URL is not set');
      throw new Error('DISCORD_WEBHOOK_URL is not set');
    }

    const discordPayload =
      this.discordNotificationMapper.toDiscordPayload(payload);

    const response = await firstValueFrom(
      this.httpService.post(webhookUrl, discordPayload),
    );

    this.logger.debug(
      `[Discord] Notification sent: ${JSON.stringify(response.data)}`,
    );
  }
}
