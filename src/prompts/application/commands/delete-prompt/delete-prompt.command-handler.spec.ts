import { DeletePromptCommandHandler } from './delete-prompt.command-handler';
import { DeletePromptCommand } from './delete-prompt.command';
import { PromptRepository } from '../../ports/prompt.repository';
import { NotFoundException } from '@nestjs/common';
import { Prompt } from '../../../domain/entities/prompt.entity';

describe('DeletePromptCommandHandler', () => {
  let handler: DeletePromptCommandHandler;
  let promptRepository: jest.Mocked<PromptRepository>;

  beforeEach(() => {
    promptRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as any;
    handler = new DeletePromptCommandHandler(promptRepository);
  });

  it('should throw NotFoundException if prompt does not exist', async () => {
    promptRepository.findById.mockResolvedValueOnce(null);
    const command = { id: 'prompt-1' } as DeletePromptCommand;
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should delete and return membership if it exists', async () => {
    const fakePrompt = { id: 'prompt-1' } as Prompt;
    promptRepository.findById.mockResolvedValueOnce(fakePrompt);
    promptRepository.delete.mockResolvedValueOnce(fakePrompt);
    const command = { id: 'prompt-1' } as DeletePromptCommand;
    const result = await handler.execute(command);
    expect(promptRepository.findById).toHaveBeenCalledWith('prompt-1');
    expect(promptRepository.delete).toHaveBeenCalledWith('prompt-1');
    expect(result).toBe(fakePrompt);
  });
});
