import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ExpenseAmountUpdatedIntegrationEvent } from 'src/expenses/application/events/expense-amount-updated.integration-event';
import { Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetDebtsByExpenseIdQuery } from 'src/debts/application/queries/get-debts-by-expense-id/get-debts-by-expense-id.query';
import { UpdateDebtCommand } from 'src/debts/application/commands/update-debt/update-debt.command';

@EventsHandler(ExpenseAmountUpdatedIntegrationEvent)
export class ExpenseAmountUpdatedDebtIntegrationEventHandler
  implements IEventHandler<ExpenseAmountUpdatedIntegrationEvent>
{
  private readonly logger = new Logger(
    ExpenseAmountUpdatedDebtIntegrationEventHandler.name,
  );

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: ExpenseAmountUpdatedIntegrationEvent) {
    this.logger.debug(
      `Handling ExpenseAmountUpdatedIntegrationEvent for expense with id: ${event.id}`,
    );

    // Get all debts by expense id
    const debts = await this.queryBus.execute(
      new GetDebtsByExpenseIdQuery(event.id),
    );

    this.logger.debug(
      `Found ${debts.length} debts for expense with id: ${event.id}`,
    );

    const promises = [];
    // Update each debt
    for (const debt of debts) {
      const member = event.members[debt.fromUserId];

      if (!member) {
        continue;
      }

      promises.push(
        this.commandBus.execute(
          new UpdateDebtCommand({
            id: debt.id,
            amount: member.amount,
            currency: member.currency,
            status: debt.status.value,
          }),
        ),
      );
    }

    await Promise.all(promises);

    this.logger.debug(
      `Updated ${promises.length} debts for expense with id: ${event.id}`,
    );
  }
}
