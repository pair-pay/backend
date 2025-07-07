import { GetAllDebtsQueryHandler } from './get-all-debts.query-handler';
import { DebtsRepository } from '../../ports/debts.repository';
import { GetAllDebtsQuery } from './get-all-debts.query';
import { Debt } from 'src/debts/domain/entities/debt';

const mockDebts = [{ id: '1' }, { id: '2' }] as unknown as Debt[];

describe('GetAllDebtsQueryHandler', () => {
  let handler: GetAllDebtsQueryHandler;
  let debtsRepository: jest.Mocked<DebtsRepository>;

  beforeEach(() => {
    debtsRepository = { findAll: jest.fn() } as any;
    handler = new GetAllDebtsQueryHandler(debtsRepository);
  });

  it('should return all debts', async () => {
    debtsRepository.findAll.mockResolvedValue(mockDebts);
    const fromDate = new Date('2024-01-01');
    const toDate = new Date('2024-01-31');
    const query = new GetAllDebtsQuery(fromDate, toDate);
    const result = await handler.execute(query);
    expect(debtsRepository.findAll).toHaveBeenCalledWith(fromDate, toDate);
    expect(result).toBe(mockDebts);
  });

  it('should propagate errors from repository', async () => {
    debtsRepository.findAll.mockRejectedValue(new Error('fail'));
    const fromDate = new Date('2024-01-01');
    const toDate = new Date('2024-01-31');
    const query = new GetAllDebtsQuery(fromDate, toDate);
    await expect(handler.execute(query)).rejects.toThrow('fail');
  });
});
