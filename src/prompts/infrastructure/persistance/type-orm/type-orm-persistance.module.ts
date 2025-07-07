import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptTypeOrmEntity } from './entities/prompt-type-orm.entity';
import { PromptRepository } from 'src/prompts/application/ports/prompt.repository';
import { PromptTypeOrmRepository } from './repositories/prompt-type-orm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PromptTypeOrmEntity])],
  providers: [
    {
      provide: PromptRepository,
      useClass: PromptTypeOrmRepository,
    },
  ],
  exports: [PromptRepository],
})
export class TypeOrmPersistanceModule {}
