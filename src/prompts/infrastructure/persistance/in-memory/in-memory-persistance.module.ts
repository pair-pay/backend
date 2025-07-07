import { Module } from '@nestjs/common';
import { PromptRepository } from 'src/prompts/application/ports/prompt.repository';
import { PromptInMemoryRepository } from './repositories/membership-in-memory.repository';

@Module({
  providers: [
    {
      provide: PromptRepository,
      useClass: PromptInMemoryRepository,
    },
  ],
  exports: [PromptRepository],
})
export class InMemoryPersistanceModule {}
