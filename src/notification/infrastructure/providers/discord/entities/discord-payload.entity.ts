export class DiscordPayloadEntity {
  embeds: {
    title: string;
    description: string;
    color: number;
    fields: { name: string; value: string; inline: boolean }[];
    footer: { text: string };
    timestamp: string;
  }[];
}
