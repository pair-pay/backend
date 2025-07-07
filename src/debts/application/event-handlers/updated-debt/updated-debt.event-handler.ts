import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedDebtEvent } from 'src/debts/domain/events/updated-debt/updated-debt.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UpdatedDebtEvent)
export class UpdatedDebtEventHandler
  implements IEventHandler<UpdatedDebtEvent>
{
  private readonly logger = new Logger(UpdatedDebtEventHandler.name);

  constructor(private readonly eventBus: EventBus) {}

  handle(event: UpdatedDebtEvent) {
    this.logger.log(`Received updated debt event: ${JSON.stringify(event)}`);
  }
}
