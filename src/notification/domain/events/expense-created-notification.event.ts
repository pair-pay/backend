/**
 * Event handler for ExpenseCreatedEvent to trigger notifications.
 */
export class ExpenseCreatedNotificationEvent {
  constructor(public readonly expenseId: string) {}
}
