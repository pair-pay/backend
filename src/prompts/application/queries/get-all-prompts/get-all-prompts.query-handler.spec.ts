import { GetAllPromptsQueryHandler } from './get-all-prompts.query-handler';
import { PromptRepository } from '../../ports/prompt.repository';
import { Prompt } from '../../../domain/entities/prompt.entity';

describe('GetAllPromptsQueryHandler', () => {
  let handler: GetAllPromptsQueryHandler;
  let promptRepository: jest.Mocked<PromptRepository>;

  beforeEach(() => {
    promptRepository = {
      findAll: jest.fn(),
    } as any;
    handler = new GetAllPromptsQueryHandler(promptRepository);
  });

  it('should return all prompts from the repository', async () => {
    const prompts = [{ id: 'm1' } as Prompt];
    promptRepository.findAll.mockResolvedValueOnce(prompts);
    const result = await handler.execute();
    expect(promptRepository.findAll).toHaveBeenCalled();
    expect(result).toBe(prompts);
  });
});
