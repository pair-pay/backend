export type NotificationPrimitive = {
  id: string;
  action: string;
  message: string;
  timestamp: Date;
  data: Record<string, any>;
};
