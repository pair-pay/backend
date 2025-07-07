import { PromptService } from './prompt.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Prompt } from '../../domain/entities/prompt.entity';
import { GetAllPromptsQuery } from '../queries/get-all-prompts/get-all-prompts.query';
import { GetPromptByIdQuery } from '../queries/get-prompt-by-id/get-prompt-by-id.query';
import { CreatePromptCommand } from '../commands/create-prompt/create-prompt.command';
import { DeletePromptCommand } from '../commands/delete-prompt/delete-prompt.command';
import { UpdatePromptCommand } from '../commands/update-prompt/update-prompt.command';

describe('PromptService', () => {
  let service: PromptService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(() => {
    commandBus = { execute: jest.fn() } as any;
    queryBus = { execute: jest.fn() } as any;
    service = new PromptService(commandBus, queryBus);
  });

  it('should call queryBus.execute on findAll', async () => {
    const query = {} as GetAllPromptsQuery;
    const prompts = [{} as Prompt];
    (queryBus.execute as jest.Mock).mockResolvedValue(prompts);
    const result = await service.findAll(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe(prompts);
  });

  it('should call queryBus.execute on findById', async () => {
    const query = {} as GetPromptByIdQuery;
    const prompt = {} as Prompt;
    (queryBus.execute as jest.Mock).mockResolvedValue(prompt);
    const result = await service.findById(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe(prompt);
  });

  it('should call commandBus.execute on createPrompt', async () => {
    const command = {} as CreatePromptCommand;
    const prompt = {} as Prompt;
    (commandBus.execute as jest.Mock).mockResolvedValue(prompt);
    const result = await service.createPrompt(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe(prompt);
  });

  it('should call commandBus.execute on updatePrompt', async () => {
    const command = {} as UpdatePromptCommand;
    const prompt = {} as Prompt;
    (commandBus.execute as jest.Mock).mockResolvedValue(prompt);
    const result = await service.updatePrompt(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe(prompt);
  });

  it('should call commandBus.execute on deletePrompt', async () => {
    const command = {} as DeletePromptCommand;
    const prompt = {} as Prompt;
    (commandBus.execute as jest.Mock).mockResolvedValue(prompt);
    const result = await service.deletePrompt(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe(prompt);
  });
});
