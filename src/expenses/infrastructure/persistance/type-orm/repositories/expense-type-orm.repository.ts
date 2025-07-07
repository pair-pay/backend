import { Injectable, Logger } from '@nestjs/common';
import { ExpenseTypeOrmEntity } from '../entities/expense-type-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TypeOrmExpenseMapper } from '../mapper/expense-type-orm.mapper';
import { ExpenseRepository } from 'src/expenses/application/ports/expense.repository';
import { Expense } from 'src/expenses/domain/expense';

@Injectable()
export class TypeOrmExpensesRepository implements ExpenseRepository {
  private readonly logger = new Logger(TypeOrmExpensesRepository.name);

  constructor(
    @InjectRepository(ExpenseTypeOrmEntity)
    private readonly expenseRepository: Repository<ExpenseTypeOrmEntity>,
  ) {}

  public async findAll(from?: Date, to?: Date): Promise<Expense[]> {
    this.logger.debug('Finding all expenses');
    const expenses = await this.expenseRepository.find(
      from && to
        ? {
            where: { date: Between(from, to) },
          }
        : {},
    );
    return expenses.map((expense) => TypeOrmExpenseMapper.toDomain(expense));
  }
  public async findById(id: string): Promise<Expense> {
    this.logger.debug(`Finding expense by id: ${id}`);
    const expense = await this.expenseRepository.findOne({ where: { id } });
    return TypeOrmExpenseMapper.toDomain(expense);
  }
  public async findByUserId(
    paidByUserId: string,
    from?: Date,
    to?: Date,
  ): Promise<Expense[]> {
    this.logger.debug(`Finding expenses by paidByUserId: ${paidByUserId}`);
    const expenses = await this.expenseRepository.find(
      from && to
        ? {
            where: { paidByUserId, date: Between(from, to) },
          }
        : { where: { paidByUserId } },
    );
    return expenses.map((expense) => TypeOrmExpenseMapper.toDomain(expense));
  }
  public async findByGroupId(
    groupId: string,
    from?: Date,
    to?: Date,
  ): Promise<Expense[]> {
    this.logger.debug(`Finding expenses by groupId: ${groupId}`);
    const expenses = await this.expenseRepository.find(
      from && to
        ? {
            where: { groupId, date: Between(from, to) },
          }
        : { where: { groupId } },
    );
    return expenses.map((expense) => TypeOrmExpenseMapper.toDomain(expense));
  }
  public async create(expense: Expense): Promise<Expense> {
    this.logger.debug(`Saving expense: ${expense}`);
    const expenseEntity = TypeOrmExpenseMapper.toPersistence(expense);
    const savedExpense = await this.expenseRepository.save(expenseEntity);
    return TypeOrmExpenseMapper.toDomain(savedExpense);
  }
  public async update(expense: Expense): Promise<Expense> {
    this.logger.debug(`Updating expense: ${expense}`);
    const expenseEntity = TypeOrmExpenseMapper.toPersistence(expense);
    const updatedExpense = await this.expenseRepository.save(expenseEntity);
    return TypeOrmExpenseMapper.toDomain(updatedExpense);
  }
  public async delete(id: string): Promise<Expense> {
    this.logger.debug(`Deleting expense by id: ${id}`);
    const expenseEntity = await this.expenseRepository.findOne({
      where: { id },
    });
    await this.expenseRepository.delete(expenseEntity.id);
    return TypeOrmExpenseMapper.toDomain(expenseEntity);
  }
}
