import { Injectable, Logger } from '@nestjs/common';
import { NotificationPrimitive } from '../../../../domain/primitives/notification.primitive';
import { DiscordPayloadEntity } from '../entities/discord-payload.entity';

@Injectable()
export class DiscordNotificationMapper {
  private readonly logger = new Logger(DiscordNotificationMapper.name);

  /**
   * Convierte un objeto data en un array de campos para Discord embed.
   * @param data Objeto con los datos a mostrar.
   * @returns Array de campos para Discord embed.
   */
  private mapDataToDiscordFields(data: Record<string, any>): any[] {
    return Object.entries(data).map(([key, value]) => ({
      name: key,
      value: `\`${value}\``,
      inline: false,
    }));
  }

  public toDiscordPayload(
    payload: NotificationPrimitive,
  ): DiscordPayloadEntity {
    const { data, action, message } = payload;
    const discordFields = this.mapDataToDiscordFields(data);

    this.logger.debug(
      `[Discord] Mapping data to Discord payload: ${JSON.stringify(
        discordFields,
      )}`,
    );

    return {
      embeds: [
        {
          title: `📥 ${action}`,
          description: message,
          color: 3447003,
          fields: this.mapDataToDiscordFields(data),
          footer: { text: `Event: ${action}` },
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }
}
