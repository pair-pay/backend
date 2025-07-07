import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DebtInMemoryMapper } from '../mapper/debt-in-memory.mapper';
import { DebtInMemoryEntity } from '../entities/debt-in-memory.entity';
import { Debt } from 'src/debts/domain/entities/debt';
import { DebtsRepository } from 'src/debts/application/ports/debts.repository';
import { DebtStatus } from 'src/debts/domain/constants/debt-status.constant';

@Injectable()
export class DebtsInMemoryRepository implements DebtsRepository {
  private readonly logger = new Logger(DebtsInMemoryRepository.name);
  private debts: Map<string, DebtInMemoryEntity> = new Map<
    string,
    DebtInMemoryEntity
  >();

  async findAll(from?: Date, to?: Date): Promise<Debt[]> {
    const entities = Array.from(this.debts.values());
    if (from && to) {
      return entities
        .filter(
          (entity) =>
            new Date(entity.createdAt) >= from &&
            new Date(entity.createdAt) <= to,
        )
        .map((entity) => DebtInMemoryMapper.toDomain(entity));
    }
    return entities.map((entity) => DebtInMemoryMapper.toDomain(entity));
  }

  public async findById(id: string): Promise<Debt> {
    this.logger.debug(`Finding debt with id: ${id}`);
    const entity = this.debts.get(id);
    if (!entity) {
      throw new NotFoundException(`Debt with id ${id} not found`);
    }
    return DebtInMemoryMapper.toDomain(entity);
  }
  public async findByExpenseId(
    expenseId: string,
    from?: Date,
    to?: Date,
  ): Promise<Debt[]> {
    const entities = Array.from(this.debts.values());
    if (from && to) {
      return entities
        .filter(
          (entity) =>
            entity.expenseId === expenseId &&
            new Date(entity.createdAt) >= from &&
            new Date(entity.createdAt) <= to,
        )
        .map((entity) => DebtInMemoryMapper.toDomain(entity));
    }
    return entities
      .filter((entity) => entity.expenseId === expenseId)
      .map((entity) => DebtInMemoryMapper.toDomain(entity));
  }
  public async findByUserId(
    userId: string,
    from?: Date,
    to?: Date,
  ): Promise<Debt[]> {
    const entities = Array.from(this.debts.values());
    if (from && to) {
      return entities
        .filter(
          (entity) =>
            entity.fromUserId === userId &&
            new Date(entity.createdAt) >= from &&
            new Date(entity.createdAt) <= to,
        )
        .map((entity) => DebtInMemoryMapper.toDomain(entity));
    }
    return entities
      .filter((entity) => entity.fromUserId === userId)
      .map((entity) => DebtInMemoryMapper.toDomain(entity));
  }

  public async findByExpenseIdAndUserId(
    expenseId: string,
    userId: string,
    from?: Date,
    to?: Date,
  ): Promise<Debt | null> {
    const entities = Array.from(this.debts.values());
    if (from && to) {
      return (
        entities
          .filter(
            (entity) =>
              entity.expenseId === expenseId &&
              entity.fromUserId === userId &&
              new Date(entity.createdAt) >= from &&
              new Date(entity.createdAt) <= to,
          )
          .map((entity) => DebtInMemoryMapper.toDomain(entity))[0] || null
      );
    }
    return (
      entities
        .filter(
          (entity) =>
            entity.expenseId === expenseId && entity.fromUserId === userId,
        )
        .map((entity) => DebtInMemoryMapper.toDomain(entity))[0] || null
    );
  }
  public async findByExpenseIdAndUserIdAndStatus(
    expenseId: string,
    userId: string,
    status: DebtStatus,
    from?: Date,
    to?: Date,
  ): Promise<Debt[]> {
    const entities = Array.from(this.debts.values());
    if (from && to) {
      return entities
        .filter(
          (entity) =>
            entity.expenseId === expenseId &&
            entity.fromUserId === userId &&
            entity.status === status &&
            new Date(entity.createdAt) >= from &&
            new Date(entity.createdAt) <= to,
        )
        .map((entity) => DebtInMemoryMapper.toDomain(entity));
    }
    return entities
      .filter(
        (entity) =>
          entity.expenseId === expenseId &&
          entity.fromUserId === userId &&
          entity.status === status,
      )
      .map((entity) => DebtInMemoryMapper.toDomain(entity));
  }

  public async create(debt: Debt): Promise<Debt> {
    this.logger.debug(`Creating debt: ${JSON.stringify(debt)}`);
    const entity = DebtInMemoryMapper.toPersistence(debt);
    this.debts.set(debt.id, entity);
    return debt;
  }
  public async update(debt: Debt): Promise<Debt> {
    this.logger.debug(`Updating debt: ${JSON.stringify(debt)}`);
    const entity = DebtInMemoryMapper.toPersistence(debt);
    this.debts.set(debt.id, entity);
    return debt;
  }
  public async delete(debt: Debt): Promise<Debt> {
    this.logger.debug(`Deleting debt: ${JSON.stringify(debt)}`);
    const entity = this.debts.get(debt.id);
    if (!entity) {
      throw new NotFoundException(`Debt with id ${debt.id} not found`);
    }
    this.debts.delete(debt.id);
    return debt;
  }
}
