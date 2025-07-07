import { Module } from '@nestjs/common';
import { NoopPromptCacheRepository } from './repositories/prompt-noop-cache.repository';
import { PromptCacheRepository } from 'src/prompts/application/ports/prompt-cache.repository';

@Module({
  providers: [
    {
      provide: PromptCacheRepository,
      useClass: NoopPromptCacheRepository,
    },
  ],
  exports: [PromptCacheRepository],
})
export class PromptsNoopCacheModule {}
