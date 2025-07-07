import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllDebtsQuery } from '../queries/get-all-debts/get-all-debts.query';
import { GetDebtByIdQuery } from '../queries/get-debt-by-id/get-debt-by-id.query';
import { GetDebtsByExpenseIdQuery } from '../queries/get-debts-by-expense-id/get-debts-by-expense-id.query';
import { GetDebtsByUserIdQuery } from '../queries/get-debts-by-user-id/get-debts-by-user-id.query';
import { GetDebtsByExpenseIdAndUserIdQuery } from '../queries/get-debts-by-expense-id-and-user-id/get-debts-by-expense-id-and-user-id.query';
import { GetDebtsByExpenseIdAndUserIdAndStatusQuery } from '../queries/get-debts-by-expense-id-and-user-id-and-status/get-debts-by-expense-id-and-user-id-and-status.query';
import { CreateDebtCommand } from '../commands/create-debt/create-debt.command';
import { UpdateDebtCommand } from '../commands/update-debt/update-debt.command';
import { UpdateDebtStatusCommand } from '../commands/update-debt-status/update-debt-status.command';
import { DeleteDebtCommand } from '../commands/delete-debt/delete-debt.command';

@Injectable()
export class DebtsService {
  private readonly logger = new Logger(DebtsService.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async getAll(command: GetAllDebtsQuery) {
    this.logger.debug(
      `Getting all debts from ${command.fromDate} to ${command.toDate}`,
    );
    return this.queryBus.execute(command);
  }

  public async getById(command: GetDebtByIdQuery) {
    this.logger.debug(`Getting debt by id: ${command.id}`);
    return this.queryBus.execute(command);
  }

  public async getByExpenseId(command: GetDebtsByExpenseIdQuery) {
    this.logger.debug(`Getting debts by expenseId: ${command.expenseId}`);
    return this.queryBus.execute(command);
  }

  public async getByUserId(command: GetDebtsByUserIdQuery) {
    this.logger.debug(`Getting debts by userId: ${command.userId}`);
    return this.queryBus.execute(command);
  }

  public async getByExpenseIdAndUserId(
    command: GetDebtsByExpenseIdAndUserIdQuery,
  ) {
    this.logger.debug(
      `Getting debts by expenseId: ${command.expenseId} and userId: ${command.userId}`,
    );
    return this.queryBus.execute(command);
  }

  public async getByExpenseIdAndUserIdAndStatus(
    command: GetDebtsByExpenseIdAndUserIdAndStatusQuery,
  ) {
    this.logger.debug(
      `Getting debts by expenseId: ${command.expenseId} and userId: ${command.userId} and status: ${command.status}`,
    );
    return this.queryBus.execute(command);
  }

  public async create(command: CreateDebtCommand) {
    this.logger.debug(`Creating debt: ${JSON.stringify(command.data)}`);
    return this.commandBus.execute(command);
  }

  public async update(command: UpdateDebtCommand) {
    this.logger.debug(`Updating debt: ${JSON.stringify(command.data)}`);
    return this.commandBus.execute(command);
  }

  public async updateStatus(command: UpdateDebtStatusCommand) {
    this.logger.debug(`Updating debt status: ${JSON.stringify(command.data)}`);
    return this.commandBus.execute(command);
  }

  public async delete(command: DeleteDebtCommand) {
    this.logger.debug(`Deleting debt: ${command.id}`);
    return this.commandBus.execute(command);
  }
}
