import { Module } from '@nestjs/common';
import { PromptRedisCacheRepository } from './repositories/prompt-cache.repository';
import { RedisProvider } from 'src/shared/infrastructure/redis/provider/redis.provider';
import { PromptCacheRepository } from 'src/prompts/application/ports/prompt-cache.repository';

@Module({
  providers: [
    RedisProvider,
    {
      provide: PromptCacheRepository,
      useClass: PromptRedisCacheRepository,
    },
  ],
  exports: [PromptCacheRepository],
})
export class PromptsRedisCacheModule {}
