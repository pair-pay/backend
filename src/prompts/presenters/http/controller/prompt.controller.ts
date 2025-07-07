import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { DeletePromptDto } from '../dto/delete-prompt.dto';
import { PromptResponseDto } from '../dto/prompt-response.dto';
import { GetAllMembershipsQuery } from 'src/memberships/application/queries/get-all-memberships/get-all-memberships.query';
import { GetMembershipByIdQuery } from 'src/memberships/application/queries/get-membership-by-id/get-membership-by-id.query';
import { PromptHttpMapper } from '../mapper/prompt-http.mapper';
import { PromptService } from 'src/prompts/application/services/prompt.service';
import { CreatePromptCommand } from 'src/prompts/application/commands/create-prompt/create-prompt.command';
import { DeletePromptCommand } from 'src/prompts/application/commands/delete-prompt/delete-prompt.command';

@ApiTags('prompts')
@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptService: PromptService) {}

  @Get()
  @ApiOperation({ summary: 'Get all prompts' })
  @ApiResponse({ status: 200, type: [PromptResponseDto] })
  async getAllPrompts() {
    const prompts = await this.promptService.findAll(
      new GetAllMembershipsQuery(),
    );
    return prompts.map(PromptHttpMapper.toResponseDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get prompt by ID' })
  @ApiResponse({ status: 200, type: PromptResponseDto })
  async getPromptById(@Param('id', ParseUUIDPipe) id: string) {
    const prompt = await this.promptService.findById(
      new GetMembershipByIdQuery(id),
    );
    return PromptHttpMapper.toResponseDto(prompt);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new prompt' })
  @ApiResponse({ status: 201, type: PromptResponseDto })
  async createPrompt(@Body() createPromptDto: CreatePromptDto) {
    const prompt = await this.promptService.createPrompt(
      new CreatePromptCommand({
        name: createPromptDto.name,
        description: createPromptDto.description,
        template: createPromptDto.template,
        isDefault: createPromptDto.isDefault,
      }),
    );
    return PromptHttpMapper.toResponseDto(prompt);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a prompt' })
  @ApiResponse({ status: 200, type: PromptResponseDto })
  async deletePrompt(@Body() deleteDto: DeletePromptDto) {
    const prompt = await this.promptService.deletePrompt(
      new DeletePromptCommand(deleteDto.id),
    );
    return PromptHttpMapper.toResponseDto(prompt);
  }
}
