import { Module } from '@nestjs/common';
import { PromptCacheRepository } from 'src/prompts/application/ports/prompt-cache.repository';
import { PromptInMemoryCacheRepository } from './repositories/prompt-in-memory-cache.repository';

@Module({
  providers: [
    {
      provide: PromptCacheRepository,
      useClass: PromptInMemoryCacheRepository,
    },
  ],
  exports: [PromptCacheRepository],
})
export class PromptsInMemoryCacheModule {}
