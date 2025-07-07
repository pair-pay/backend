import { DynamicModule, Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { PromptsApplicationModule } from './application/prompts-application.module';
import { PromptsDomainModule } from './domain/prompts-domain.module';
import { PromptsInfrastructureModule } from './infrastructure/prompts-infrastructure.module';

@Module({})
export class PromptsModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: PromptsModule,
      imports: [
        PromptsDomainModule,
        PromptsApplicationModule,
        PromptsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
      exports: [PromptsApplicationModule, PromptsInfrastructureModule],
    };
  }
}
