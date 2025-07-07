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
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseService } from '../../application/expense.service';
import { GetAllExpensesQuery } from 'src/expenses/application/queries/get-all-expenses.query';
import { GetExpenseByIdQuery } from 'src/expenses/application/queries/get-expense-by-id.query';
import { GetExpenseByUserIdQuery } from 'src/expenses/application/queries/get-expense-by-user-id.query';
import { GetExpenseByGroupIdQuery } from 'src/expenses/application/queries/get-expense-by-group-id.query';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CreateExpenseCommand } from 'src/expenses/application/commands/create-expense.command';
import { UpdateExpenseCommand } from 'src/expenses/application/commands/update-expense.command';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DeleteExpenseDto } from './dto/delete-expense.dto';
import { DeleteExpenseCommand } from 'src/expenses/application/commands/delete-expense.command';
import { SPLIT_TYPES } from 'src/expenses/domain/constants/split-types.constant';
import { ExpenseHttpMapper } from './mapper/expense-http.mapper';
import { UpdateExpenseAmountCommand } from 'src/expenses/application/commands/update-expense-amount.command';
import { UpdateExpenseAmountDto } from './dto/update-expense-amount.dto';
import { GetAllSplitTypesQuery } from 'src/expenses/application/queries/get-all-split-types.query';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  private readonly logger = new Logger(ExpensesController.name);

  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users' })
  async getAllExpenses(@Query('from') from: string, @Query('to') to: string) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const expenses = await this.expenseService.getAll(
      new GetAllExpensesQuery(fromDate, toDate),
    );

    return expenses.map((expense) => ExpenseHttpMapper.toResponseDto(expense));
  }

  @Get('split-types')
  @ApiOperation({ summary: 'Get all split types' })
  @ApiResponse({ status: 200, description: 'Returns all split types' })
  async getSplitTypes() {
    this.logger.debug('Getting split types');

    const splitTypes = await this.expenseService.getSplitTypes(
      new GetAllSplitTypesQuery(),
    );

    return splitTypes;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Returns a user' })
  async getExpenseById(@Param('id', ParseUUIDPipe) id: string) {
    const expense = await this.expenseService.getById(
      new GetExpenseByIdQuery(id),
    );

    return ExpenseHttpMapper.toResponseDto(expense);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get expenses by user ID' })
  @ApiResponse({ status: 200, description: 'Returns expenses by user ID' })
  async getExpensesByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const expenses = await this.expenseService.getByUserId(
      new GetExpenseByUserIdQuery(userId, fromDate, toDate),
    );

    return expenses.map((expense) => ExpenseHttpMapper.toResponseDto(expense));
  }

  @Get('group/:groupId')
  @ApiOperation({ summary: 'Get expenses by group ID' })
  @ApiResponse({ status: 200, description: 'Returns expenses by group ID' })
  async getExpensesByGroupId(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const expenses = await this.expenseService.getByGroupId(
      new GetExpenseByGroupIdQuery(groupId, fromDate, toDate),
    );

    return expenses.map((expense) => ExpenseHttpMapper.toResponseDto(expense));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: ' created successfully' })
  async createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    const date = new Date(createExpenseDto.date);

    const expense = await this.expenseService.create(
      new CreateExpenseCommand({
        ...createExpenseDto,
        date,
        splitType: createExpenseDto.splitType ?? SPLIT_TYPES.EQUAL,
      }),
    );

    return ExpenseHttpMapper.toResponseDto(expense);
  }

  @Put()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: ' updated successfully' })
  async updateExpense(@Body() updateExpenseDto: UpdateExpenseDto) {
    const date = new Date(updateExpenseDto.date);

    const expense = await this.expenseService.update(
      new UpdateExpenseCommand(updateExpenseDto.id, {
        ...updateExpenseDto,
        date,
      }),
    );

    return ExpenseHttpMapper.toResponseDto(expense);
  }

  @Put('amount')
  @ApiOperation({ summary: 'Update the amount of an expense' })
  @ApiResponse({ status: 200, description: ' updated successfully' })
  async updateExpenseAmount(
    @Body() updateExpenseAmountDto: UpdateExpenseAmountDto,
  ) {
    const expense = await this.expenseService.updateAmount(
      new UpdateExpenseAmountCommand(
        updateExpenseAmountDto.id,
        updateExpenseAmountDto.amount,
        updateExpenseAmountDto.currency,
      ),
    );

    return ExpenseHttpMapper.toResponseDto(expense);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: ' deleted successfully' })
  async deleteExpense(@Body() deleteExpenseDto: DeleteExpenseDto) {
    const expense = await this.expenseService.delete(
      new DeleteExpenseCommand(deleteExpenseDto.id),
    );

    return ExpenseHttpMapper.toResponseDto(expense);
  }
}
