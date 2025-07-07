import { Injectable, Logger } from '@nestjs/common';
import { DebtTypeOrmEntity } from '../entities/debt-type-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TypeOrmDebtMapper } from '../mapper/debt-type-orm.mapper';
import { DebtsRepository } from 'src/debts/application/ports/debts.repository';
import { Debt } from 'src/debts/domain/entities/debt';
import { DebtStatus } from 'src/debts/domain/constants/debt-status.constant';

@Injectable()
export class TypeOrmDebtsRepository implements DebtsRepository {
  private readonly logger = new Logger(TypeOrmDebtsRepository.name);

  constructor(
    @InjectRepository(DebtTypeOrmEntity)
    private readonly debtRepository: Repository<DebtTypeOrmEntity>,
  ) {}

  public async findAll(from?: Date, to?: Date): Promise<Debt[]> {
    this.logger.debug('Finding all debts');
    const debts = await this.debtRepository.find(
      from && to
        ? {
            where: { createdAt: Between(from, to) },
          }
        : {},
    );
    return debts.map((debt) => TypeOrmDebtMapper.toDomain(debt));
  }
  public async findById(id: string): Promise<Debt> {
    this.logger.debug(`Finding debt by id: ${id}`);
    const debt = await this.debtRepository.findOne({ where: { id } });
    return TypeOrmDebtMapper.toDomain(debt);
  }
  public async findByUserId(
    userId: string,
    from?: Date,
    to?: Date,
  ): Promise<Debt[]> {
    this.logger.debug(`Finding debts by userId: ${userId}`);
    const debts = await this.debtRepository.find(
      from && to
        ? {
            where: { fromUserId: userId, createdAt: Between(from, to) },
          }
        : { where: { fromUserId: userId } },
    );
    return debts.map((debt) => TypeOrmDebtMapper.toDomain(debt));
  }
  public async findByExpenseId(
    expenseId: string,
    from?: Date,
    to?: Date,
  ): Promise<Debt[]> {
    this.logger.debug(`Finding debts by expenseId: ${expenseId}`);
    const debts = await this.debtRepository.find(
      from && to
        ? { where: { expenseId, createdAt: Between(from, to) } }
        : { where: { expenseId } },
    );
    return debts.map((debt) => TypeOrmDebtMapper.toDomain(debt));
  }

  public async findByExpenseIdAndUserId(
    expenseId: string,
    userId: string,
    from?: Date,
    to?: Date,
  ): Promise<Debt> {
    this.logger.debug(
      `Finding debt by expenseId and userId: ${expenseId} and ${userId}`,
    );
    const debt = await this.debtRepository.findOne({
      where: { expenseId, fromUserId: userId },
    });
    return TypeOrmDebtMapper.toDomain(debt);
  }

  public async findByExpenseIdAndUserIdAndStatus(
    expenseId: string,
    userId: string,
    status: DebtStatus,
    from?: Date,
    to?: Date,
  ): Promise<Debt[]> {
    this.logger.debug(
      `Finding debts by expenseId and userId and status: ${expenseId} and ${userId} and ${status}`,
    );
    const debts = await this.debtRepository.find(
      from && to
        ? {
            where: {
              expenseId,
              fromUserId: userId,
              status,
              createdAt: Between(from, to),
            },
          }
        : { where: { expenseId, fromUserId: userId, status } },
    );
    return debts.map((debt) => TypeOrmDebtMapper.toDomain(debt));
  }

  public async create(debt: Debt): Promise<Debt> {
    this.logger.debug(`Saving debt: ${debt}`);
    const debtEntity = TypeOrmDebtMapper.toPersistence(debt);
    const savedDebt = await this.debtRepository.save(debtEntity);
    return TypeOrmDebtMapper.toDomain(savedDebt);
  }
  public async update(debt: Debt): Promise<Debt> {
    this.logger.debug(`Updating debt: ${debt}`);
    const debtEntity = TypeOrmDebtMapper.toPersistence(debt);
    const updatedDebt = await this.debtRepository.save(debtEntity);
    return TypeOrmDebtMapper.toDomain(updatedDebt);
  }
  public async delete(debt: Debt): Promise<Debt> {
    this.logger.debug(`Deleting debt by id: ${debt.id}`);
    const debtEntity = await this.debtRepository.findOne({
      where: { id: debt.id },
    });
    await this.debtRepository.delete(debtEntity.id);
    return TypeOrmDebtMapper.toDomain(debtEntity);
  }
}
