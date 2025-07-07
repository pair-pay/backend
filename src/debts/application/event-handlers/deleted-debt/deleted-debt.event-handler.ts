import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedDebtEvent } from 'src/debts/domain/events/deleted-debt/deleted-debt.event';
import { Logger } from '@nestjs/common';

@EventsHandler(DeletedDebtEvent)
export class DeletedDebtEventHandler
  implements IEventHandler<DeletedDebtEvent>
{
  private readonly logger = new Logger(DeletedDebtEventHandler.name);

  constructor(private readonly eventBus: EventBus) {}

  handle(event: DeletedDebtEvent) {
    this.logger.log(`Received deleted debt event: ${JSON.stringify(event)}`);
  }
}
