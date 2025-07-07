import { GetPromptByIdQueryHandler } from './get-prompt-by-id.query-handler';
import { PromptRepository } from '../../ports/prompt.repository';
import { GetPromptByIdQuery } from './get-prompt-by-id.query';
import { Prompt } from '../../../domain/entities/prompt.entity';

describe('GetPromptByIdQueryHandler', () => {
  let handler: GetPromptByIdQueryHandler;
  let promptRepository: jest.Mocked<PromptRepository>;

  beforeEach(() => {
    promptRepository = {
      findById: jest.fn(),
    } as any;
    handler = new GetPromptByIdQueryHandler(promptRepository);
  });

  it('should return the prompt from the repository by id', async () => {
    const prompt = { id: 'm1' } as Prompt;
    promptRepository.findById.mockResolvedValueOnce(prompt);
    const query = { id: 'm1' } as GetPromptByIdQuery;
    const result = await handler.execute(query);
    expect(promptRepository.findById).toHaveBeenCalledWith('m1');
    expect(result).toBe(prompt);
  });
});
