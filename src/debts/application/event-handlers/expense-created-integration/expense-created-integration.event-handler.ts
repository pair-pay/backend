import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { DebtsService } from 'src/debts/application/services/debt.service';
import { CreateDebtCommand } from 'src/debts/application/commands/create-debt/create-debt.command';
import { ExpenseCreatedIntegrationEvent } from 'src/expenses/application/events/expense-created.integration-event';

@EventsHandler(ExpenseCreatedIntegrationEvent)
export class ExpenseCreatedDebtIntegrationEventHandler
  implements IEventHandler<ExpenseCreatedIntegrationEvent>
{
  private readonly logger = new Logger(
    ExpenseCreatedDebtIntegrationEventHandler.name,
  );

  constructor(private readonly debtsService: DebtsService) {}

  async handle(event: ExpenseCreatedIntegrationEvent) {
    this.logger.debug(
      `Handling ExpenseCreatedIntegrationEvent for expense with id: ${event.id}`,
    );

    for (const [userId, { amount, currency }] of Object.entries(
      event.members,
    )) {
      if (userId !== event.userId) {
        await this.debtsService.create(
          new CreateDebtCommand({
            expenseId: event.id,
            fromUserId: userId,
            toUserId: event.userId,
            amount,
            currency,
          }),
        );
      }
    }
  }
}
