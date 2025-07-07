import { DebtsService } from './debt.service';
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

const validCreateDto = {
  expenseId: 'e1',
  fromUserId: 'u1',
  toUserId: 'u2',
  amount: 100,
  currency: 'EUR',
};
const validUpdateDto = {
  id: 'd1',
  amount: 200,
  currency: 'EUR',
  status: 'pending',
};
const validUpdateStatusDto = { id: 'd1', status: 'paid' };

describe('DebtsService', () => {
  let service: DebtsService;
  let commandBus: jest.Mocked<CommandBus>;
  let queryBus: jest.Mocked<QueryBus>;

  beforeEach(() => {
    commandBus = { execute: jest.fn() } as any;
    queryBus = { execute: jest.fn() } as any;
    service = new DebtsService(commandBus, queryBus);
  });

  it('getAll should call queryBus.execute and return result', async () => {
    const query = new GetAllDebtsQuery();
    queryBus.execute.mockResolvedValue('result');
    const result = await service.getAll(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe('result');
  });

  it('getById should call queryBus.execute and return result', async () => {
    const query = new GetDebtByIdQuery('id');
    queryBus.execute.mockResolvedValue('result');
    const result = await service.getById(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe('result');
  });

  it('getByExpenseId should call queryBus.execute and return result', async () => {
    const query = new GetDebtsByExpenseIdQuery('eid');
    queryBus.execute.mockResolvedValue('result');
    const result = await service.getByExpenseId(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe('result');
  });

  it('getByUserId should call queryBus.execute and return result', async () => {
    const query = new GetDebtsByUserIdQuery('uid');
    queryBus.execute.mockResolvedValue('result');
    const result = await service.getByUserId(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe('result');
  });

  it('getByExpenseIdAndUserId should call queryBus.execute and return result', async () => {
    const query = new GetDebtsByExpenseIdAndUserIdQuery('eid', 'uid');
    queryBus.execute.mockResolvedValue('result');
    const result = await service.getByExpenseIdAndUserId(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe('result');
  });

  it('getByExpenseIdAndUserIdAndStatus should call queryBus.execute and return result', async () => {
    const query = new GetDebtsByExpenseIdAndUserIdAndStatusQuery(
      'eid',
      'uid',
      'pending',
    );
    queryBus.execute.mockResolvedValue('result');
    const result = await service.getByExpenseIdAndUserIdAndStatus(query);
    expect(queryBus.execute).toHaveBeenCalledWith(query);
    expect(result).toBe('result');
  });

  it('create should call commandBus.execute and return result', async () => {
    const command = new CreateDebtCommand(validCreateDto);
    commandBus.execute.mockResolvedValue('result');
    const result = await service.create(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe('result');
  });

  it('update should call commandBus.execute and return result', async () => {
    const command = new UpdateDebtCommand(validUpdateDto);
    commandBus.execute.mockResolvedValue('result');
    const result = await service.update(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe('result');
  });

  it('updateStatus should call commandBus.execute and return result', async () => {
    const command = new UpdateDebtStatusCommand(validUpdateStatusDto);
    commandBus.execute.mockResolvedValue('result');
    const result = await service.updateStatus(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe('result');
  });

  it('delete should call commandBus.execute and return result', async () => {
    const command = new DeleteDebtCommand('id');
    commandBus.execute.mockResolvedValue('result');
    const result = await service.delete(command);
    expect(commandBus.execute).toHaveBeenCalledWith(command);
    expect(result).toBe('result');
  });

  it('should propagate errors from queryBus', async () => {
    const query = new GetAllDebtsQuery();
    queryBus.execute.mockRejectedValue(new Error('fail'));
    await expect(service.getAll(query)).rejects.toThrow('fail');
  });

  it('should propagate errors from commandBus', async () => {
    const command = new CreateDebtCommand(validCreateDto);
    commandBus.execute.mockRejectedValue(new Error('fail'));
    await expect(service.create(command)).rejects.toThrow('fail');
  });
});
