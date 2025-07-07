export interface ApplicationBootstrapOptions {
  databaseDriver: 'in-memory' | 'type-orm';
  cacheDriver: 'in-memory' | 'redis' | 'noop';
  notificationProviders?: Array<'discord' | 'google-chat'>;
}
