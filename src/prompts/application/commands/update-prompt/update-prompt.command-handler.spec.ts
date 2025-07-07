import { UpdatePromptCommandHandler } from './update-prompt.command-handler';
import { UpdatePromptCommand } from './update-prompt.command';
import { PromptRepository } from '../../ports/prompt.repository';
import { NotFoundException } from '@nestjs/common';
import { Prompt } from '../../../domain/entities/prompt.entity';

describe('UpdatePromptCommandHandler', () => {
  let handler: UpdatePromptCommandHandler;
  let promptRepository: jest.Mocked<PromptRepository>;

  beforeEach(() => {
    promptRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;
    handler = new UpdatePromptCommandHandler(promptRepository);
  });

  it('should throw NotFoundException if prompt does not exist', async () => {
    promptRepository.findById.mockResolvedValueOnce(null);
    const command = { id: 'prompt-1', prompt: {} } as UpdatePromptCommand;
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should update and return prompt if it exists', async () => {
    const fakePrompt = {
      id: 'prompt-1',
      update: jest.fn().mockReturnValue('updatedPrompt'),
    } as any as Prompt;
    promptRepository.findById.mockResolvedValueOnce(fakePrompt);
    promptRepository.update.mockResolvedValueOnce('updatedPrompt' as any);
    const command = {
      id: 'prompt-1',
      prompt: { name: 'new name' },
    } as UpdatePromptCommand;
    const result = await handler.execute(command);
    expect(promptRepository.findById).toHaveBeenCalledWith('prompt-1');
    expect(fakePrompt.update).toHaveBeenCalledWith(command.prompt);
    expect(promptRepository.update).toHaveBeenCalledWith('updatedPrompt');
    expect(result).toBe('updatedPrompt');
  });
});
