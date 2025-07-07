import { DynamicModule, Module, Type } from '@nestjs/common';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { CreatePromptCommandHandler } from './commands/create-prompt/create-prompt.command-handler';
import { DeletePromptCommandHandler } from './commands/delete-prompt/delete-prompt.command-handler';
import { UpdatePromptCommandHandler } from './commands/update-prompt/update-prompt.command-handler';
import { GetAllPromptsQueryHandler } from './queries/get-all-prompts/get-all-prompts.query-handler';
import { GetPromptByIdQueryHandler } from './queries/get-prompt-by-id/get-prompt-by-id.query-handler';
import { PromptCreatedEventHandler } from './event-handlers/prompt-created/prompt-created.event-handler';
import { PromptDeletedEventHandler } from './event-handlers/prompt-deleted/prompt-deleted.event-handler';
import { PromptService } from './services/prompt.service';
import { PromptFactory } from '../domain/factories/prompt.factory';
import { PromptsDomainModule } from '../domain/prompts-domain.module';
import { PromptUpdatedEventHandler } from './event-handlers/prompt-updated/prompt-updated.event-handler';
import { PromptsController } from '../presenters/http/controller/prompt.controller';

const CommandHandlers = [
  CreatePromptCommandHandler,
  DeletePromptCommandHandler,
  UpdatePromptCommandHandler,
];

const QueryHandlers = [GetAllPromptsQueryHandler, GetPromptByIdQueryHandler];

const EventHandlers = [
  PromptCreatedEventHandler,
  PromptUpdatedEventHandler,
  PromptDeletedEventHandler,
];

@Module({
  imports: [PromptsDomainModule],
  controllers: [PromptsController],
  providers: [
    PromptService,
    PromptFactory,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class PromptsApplicationModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
    options: ApplicationBootstrapOptions,
  ) {
    return {
      module: PromptsApplicationModule,
      imports: [infrastructureModule],
    };
  }
}
