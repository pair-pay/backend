import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ExpenseInMemoryMapper } from '../mapper/expense-in-memory.mapper';
import { ExpenseInMemoryEntity } from '../entities/expense-in-memory.entity';
import { ExpenseRepository } from 'src/expenses/application/ports/expense.repository';
import { Expense } from 'src/expenses/domain/expense';

@Injectable()
export class ExpensesInMemoryRepository implements ExpenseRepository {
  private readonly logger = new Logger(ExpensesInMemoryRepository.name);
  private expenses: Map<string, ExpenseInMemoryEntity> = new Map<
    string,
    ExpenseInMemoryEntity
  >();

  async findAll(from?: Date, to?: Date): Promise<Expense[]> {
    const entities = Array.from(this.expenses.values());
    if (from && to) {
      return entities
        .filter((entity) => entity.date >= from && entity.date <= to)
        .map((entity) => ExpenseInMemoryMapper.toDomain(entity));
    }
    return entities.map((entity) => ExpenseInMemoryMapper.toDomain(entity));
  }

  public async findById(id: string): Promise<Expense> {
    this.logger.debug(`Finding expense with id: ${id}`);
    const entity = this.expenses.get(id);
    if (!entity) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return ExpenseInMemoryMapper.toDomain(entity);
  }

  public async findByUserId(
    userId: string,
    from?: Date,
    to?: Date,
  ): Promise<Expense[]> {
    this.logger.debug(`Finding expenses with paidByUserId: ${userId}`);
    const entities = Array.from(this.expenses.values()).filter(
      (expense) => expense.paidByUserId === userId,
    );

    if (from && to) {
      return entities
        .filter((entity) => entity.date >= from && entity.date <= to)
        .map((entity) => ExpenseInMemoryMapper.toDomain(entity));
    }

    return entities.map((entity) => ExpenseInMemoryMapper.toDomain(entity));
  }

  public async findByGroupId(
    groupId: string,
    from?: Date,
    to?: Date,
  ): Promise<Expense[]> {
    this.logger.debug(`Finding expenses with groupId: ${groupId}`);
    const entities = Array.from(this.expenses.values()).filter(
      (expense) => expense.groupId === groupId,
    );

    if (from && to) {
      return entities
        .filter((entity) => entity.date >= from && entity.date <= to)
        .map((entity) => ExpenseInMemoryMapper.toDomain(entity));
    }
    return entities.map((entity) => ExpenseInMemoryMapper.toDomain(entity));
  }

  public async create(expense: Expense): Promise<Expense> {
    this.logger.debug(`Creating expense: ${JSON.stringify(expense)}`);
    const entity = ExpenseInMemoryMapper.toPersistence(expense);
    this.expenses.set(expense.id, entity);
    return expense;
  }
  public async update(expense: Expense): Promise<Expense> {
    this.logger.debug(`Updating expense: ${JSON.stringify(expense)}`);
    const entity = ExpenseInMemoryMapper.toPersistence(expense);
    this.expenses.set(expense.id, entity);
    return expense;
  }
  public async delete(id: string): Promise<Expense> {
    this.logger.debug(`Deleting expense with id: ${id}`);
    const expense = this.expenses.get(id);
    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    this.expenses.delete(id);
    return ExpenseInMemoryMapper.toDomain(expense);
  }
}
