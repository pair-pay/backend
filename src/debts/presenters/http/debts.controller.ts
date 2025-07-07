import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDebtDto } from './dto/create-debt.dto';
import { DeleteDebtDto } from './dto/delete-debt.dto';
import { DebtsService } from 'src/debts/application/services/debt.service';
import { GetAllDebtsQuery } from 'src/debts/application/queries/get-all-debts/get-all-debts.query';
import { GetDebtByIdQuery } from 'src/debts/application/queries/get-debt-by-id/get-debt-by-id.query';
import { GetDebtsByUserIdQuery } from 'src/debts/application/queries/get-debts-by-user-id/get-debts-by-user-id.query';
import { CreateDebtCommand } from 'src/debts/application/commands/create-debt/create-debt.command';
import { UpdateDebtStatusCommand } from 'src/debts/application/commands/update-debt-status/update-debt-status.command';
import { UpdateDebtStatusDto } from './dto/update-debt-status.dto';
import { DeleteDebtCommand } from 'src/debts/application/commands/delete-debt/delete-debt.command';
import { GetDebtsByExpenseIdQuery } from 'src/debts/application/queries/get-debts-by-expense-id/get-debts-by-expense-id.query';
import { GetDebtsByExpenseIdAndUserIdQuery } from 'src/debts/application/queries/get-debts-by-expense-id-and-user-id/get-debts-by-expense-id-and-user-id.query';
import { DebtStatus } from 'src/debts/domain/constants/debt-status.constant';
import { GetDebtsByExpenseIdAndUserIdAndStatusQuery } from 'src/debts/application/queries/get-debts-by-expense-id-and-user-id-and-status/get-debts-by-expense-id-and-user-id-and-status.query';
import { DebtHttpMapper } from './mapper/debt-http.mapper';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { UpdateDebtCommand } from 'src/debts/application/commands/update-debt/update-debt.command';
import { JwtAuthGuard } from 'src/auth/infrastructure/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/infrastructure/decorators/roles.decorator';

@ApiTags('debts')
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtService: DebtsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all debts' })
  @ApiResponse({ status: 200, description: 'Returns all debts' })
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async getAllDebts(@Query('from') from: string, @Query('to') to: string) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const debts = await this.debtService.getAll(
      new GetAllDebtsQuery(fromDate, toDate),
    );
    return debts.map((debt) => DebtHttpMapper.toResponseDto(debt));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get debt by ID' })
  @ApiResponse({ status: 200, description: 'Returns a debt' })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async getDebtById(@Param('id', ParseUUIDPipe) id: string) {
    const debt = await this.debtService.getById(new GetDebtByIdQuery(id));
    return DebtHttpMapper.toResponseDto(debt);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get debts by user ID' })
  @ApiResponse({ status: 200, description: 'Returns debts by user ID' })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async getDebtsByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const debts = await this.debtService.getByUserId(
      new GetDebtsByUserIdQuery(userId, fromDate, toDate),
    );
    return debts.map((debt) => DebtHttpMapper.toResponseDto(debt));
  }

  @Get('expense/:expenseId')
  @ApiOperation({ summary: 'Get debts by expense ID' })
  @ApiResponse({ status: 200, description: 'Returns debts by expense ID' })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async getDebtsByExpenseId(
    @Param('expenseId', ParseUUIDPipe) expenseId: string,
  ) {
    const debts = await this.debtService.getByExpenseId(
      new GetDebtsByExpenseIdQuery(expenseId),
    );
    return debts.map((debt) => DebtHttpMapper.toResponseDto(debt));
  }

  @Get('user/:userId/expense/:expenseId')
  @ApiOperation({ summary: 'Get debts by user ID and expense ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns debts by user ID and expense ID',
  })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async getDebtsByUserIdAndExpenseId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('expenseId', ParseUUIDPipe) expenseId: string,
  ) {
    const debts = await this.debtService.getByExpenseIdAndUserId(
      new GetDebtsByExpenseIdAndUserIdQuery(userId, expenseId),
    );
    return debts.map((debt) => DebtHttpMapper.toResponseDto(debt));
  }

  @Get('user/:userId/expense/:expenseId/status/:status')
  @ApiOperation({ summary: 'Get debts by user ID, expense ID and status' })
  @ApiResponse({
    status: 200,
    description: 'Returns debts by user ID, expense ID and status',
  })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async getDebtsByUserIdAndExpenseIdAndStatus(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('expenseId', ParseUUIDPipe) expenseId: string,
    @Param('status') status: string,
  ) {
    const debts = await this.debtService.getByExpenseIdAndUserIdAndStatus(
      new GetDebtsByExpenseIdAndUserIdAndStatusQuery(userId, expenseId, status),
    );
    return debts.map((debt) => DebtHttpMapper.toResponseDto(debt));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: ' created successfully' })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async createDebt(@Body() createDebtDto: CreateDebtDto) {
    const debt = await this.debtService.create(
      new CreateDebtCommand({
        ...createDebtDto,
      }),
    );
    return DebtHttpMapper.toResponseDto(debt);
  }

  @Put()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: ' updated successfully' })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async updateDebt(@Body() updateDebtDto: UpdateDebtDto) {
    const debt = await this.debtService.update(
      new UpdateDebtCommand(updateDebtDto),
    );
    return DebtHttpMapper.toResponseDto(debt);
  }

  @Put('/status')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: ' updated successfully' })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async updateDebtStatus(@Body() updateDebtStatusDto: UpdateDebtStatusDto) {
    const debt = await this.debtService.updateStatus(
      new UpdateDebtStatusCommand(updateDebtStatusDto),
    );
    return DebtHttpMapper.toResponseDto(debt);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: ' deleted successfully' })
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async deleteDebt(@Body() deleteDebtDto: DeleteDebtDto) {
    const debt = await this.debtService.delete(
      new DeleteDebtCommand(deleteDebtDto.id),
    );
    return DebtHttpMapper.toResponseDto(debt);
  }
}
