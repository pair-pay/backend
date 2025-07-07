import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedDebtIntegrationEvent } from '../../events/created-debt.integration-event';
import { CreatedDebtEvent } from 'src/debts/domain/events/created-debt/created-debt.event';
import { Logger } from '@nestjs/common';

@EventsHandler(CreatedDebtEvent)
export class CreatedDebtEventHandler
  implements IEventHandler<CreatedDebtEvent>
{
  private readonly logger = new Logger(CreatedDebtEventHandler.name);

  constructor(private readonly eventBus: EventBus) {}

  handle(event: CreatedDebtEvent) {
    this.logger.log(`Received created debt event: ${JSON.stringify(event)}`);

    const createdDebtIntegrationEvent = new CreatedDebtIntegrationEvent(
      event.debt.id,
      event.debt.expenseId,
      event.debt.fromUserId,
      event.debt.toUserId,
      event.debt.amount.value,
      event.debt.amount.currency,
      event.debt.status.value,
      event.debt.createdAt,
    );

    this.eventBus.publish(createdDebtIntegrationEvent);
  }
}
