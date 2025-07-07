import { Test, TestingModule } from '@nestjs/testing';
import { PromptsController } from './prompt.controller';
import { PromptService } from '../../../application/services/prompt.service';
import { PromptHttpMapper } from '../mapper/prompt-http.mapper';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { DeletePromptDto } from '../dto/delete-prompt.dto';
import { PromptResponseDto } from '../dto/prompt-response.dto';

describe('PromptsController', () => {
  let controller: PromptsController;
  let service: jest.Mocked<PromptService>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      findById: jest.fn(),
      createPrompt: jest.fn(),
      deletePrompt: jest.fn(),
    } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromptsController],
      providers: [{ provide: PromptService, useValue: service }],
    }).compile();
    controller = module.get<PromptsController>(PromptsController);
  });

  /**
   * Should return mapped prompts for getAllPrompts
   */
  it('should return mapped prompts for getAllPrompts', async () => {
    const prompts = [
      {
        id: 'p1',
        name: 'Prompt 1',
        description: 'desc',
        template: 'template',
        isDefault: false,
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
        updatedAt: new Date('2023-01-02T00:00:00.000Z'),
        version: 1,
      },
    ];
    const mapped: PromptResponseDto[] = [
      {
        id: 'p1',
        name: 'Prompt 1',
        description: 'desc',
        template: 'template',
        isDefault: false,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
        version: 1,
      },
    ];
    service.findAll.mockResolvedValueOnce(prompts as any);
    jest
      .spyOn(PromptHttpMapper, 'toResponseDto')
      .mockImplementation((m) => mapped[0]);
    const result = await controller.getAllPrompts();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  /**
   * Should return mapped prompt for getPromptById
   */
  it('should return mapped prompt for getPromptById', async () => {
    const prompt = {
      id: 'p1',
      name: 'Prompt 1',
      description: 'desc',
      template: 'template',
      isDefault: false,
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
      version: 1,
    };
    const mapped: PromptResponseDto = {
      id: 'p1',
      name: 'Prompt 1',
      description: 'desc',
      template: 'template',
      isDefault: false,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
      version: 1,
    };
    service.findById.mockResolvedValueOnce(prompt as any);
    jest
      .spyOn(PromptHttpMapper, 'toResponseDto')
      .mockImplementation(() => mapped);
    const result = await controller.getPromptById('p1');
    expect(service.findById).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  /**
   * Should return mapped prompt for createPrompt
   */
  it('should return mapped prompt for createPrompt', async () => {
    const createDto: CreatePromptDto = {
      name: 'Prompt 1',
      description: 'desc',
      template: 'template',
      isDefault: false,
    };
    const prompt = {
      id: 'p1',
      ...createDto,
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
      version: 1,
    };
    const mapped: PromptResponseDto = {
      id: 'p1',
      name: 'Prompt 1',
      description: 'desc',
      template: 'template',
      isDefault: false,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
      version: 1,
    };
    service.createPrompt.mockResolvedValueOnce(prompt as any);
    jest
      .spyOn(PromptHttpMapper, 'toResponseDto')
      .mockImplementation(() => mapped);
    const result = await controller.createPrompt(createDto);
    expect(service.createPrompt).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });

  /**
   * Should return mapped prompt for deletePrompt
   */
  it('should return mapped prompt for deletePrompt', async () => {
    const deleteDto: DeletePromptDto = { id: 'p1' };
    const prompt = {
      id: 'p1',
      name: 'Prompt 1',
      description: 'desc',
      template: 'template',
      isDefault: false,
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-02T00:00:00.000Z'),
      version: 1,
    };
    const mapped: PromptResponseDto = {
      id: 'p1',
      name: 'Prompt 1',
      description: 'desc',
      template: 'template',
      isDefault: false,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
      version: 1,
    };
    service.deletePrompt.mockResolvedValueOnce(prompt as any);
    jest
      .spyOn(PromptHttpMapper, 'toResponseDto')
      .mockImplementation(() => mapped);
    const result = await controller.deletePrompt(deleteDto);
    expect(service.deletePrompt).toHaveBeenCalled();
    expect(result).toEqual(mapped);
  });
});
