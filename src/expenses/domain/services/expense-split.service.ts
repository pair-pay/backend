import { Injectable, Logger } from '@nestjs/common';
import { AmountValueObject } from '../value-objects/amount.value-object';
import { SplitTypeValueObject } from '../value-objects/split-type.value-object';
import { SPLIT_TYPES } from '../constants/split-types.constant';
import { InvalidSplitTypeException } from '../exceptions/invalid-split-type.exception';

@Injectable()
export class ExpenseSplitService {
  private readonly logger = new Logger(ExpenseSplitService.name);

  constructor() {}

  /**
   * Divide el gasto entre los usuarios según el tipo de división.
   * @param amount Monto total del gasto.
   * @param currency Moneda del gasto.
   * @param userIds IDs de los usuarios entre los que se divide.
   * @param splitType Tipo de división ('equal', 'custom', 'percentage').
   * @param customSplits (opcional) Mapa de usuario a cantidad personalizada.
   * @returns Mapa de usuario a AmountValueObject.
   */
  public splitExpense(
    amount: number,
    currency: string,
    userIds: string[],
    splitType: string,
    customSplits?: Record<string, number>,
  ): Record<string, { amount: number; currency: string }> {
    switch (splitType) {
      case SPLIT_TYPES.EQUAL:
        return this.splitEqual(amount, currency, userIds);
      case SPLIT_TYPES.PERCENTAGE:
        return this.splitPercentage(amount, currency, userIds, customSplits);
      default:
        throw new InvalidSplitTypeException(
          `Invalid split type: ${splitType}. Valid split types are: ${Object.values(
            SPLIT_TYPES,
          ).join(', ')}`,
        );
    }
  }

  /**
   * Divide el gasto de forma equitativa entre los usuarios, excluyendo al pagador.
   * @param amount Monto total del gasto.
   * @param currency Moneda del gasto.
   * @param userIds IDs de los usuarios entre los que se divide.
   * @param paidByUserId ID del usuario que pagó el gasto.
   * @returns Mapa de usuario a AmountValueObject.
   */
  private splitEqual(
    amount: number,
    currency: string,
    userIds: string[],
  ): Record<string, { amount: number; currency: string }> {
    const splitAmount = amount / userIds.length;
    return Object.fromEntries(
      userIds.map((userId) => [
        userId,
        {
          amount: Number(splitAmount.toFixed(2)),
          currency,
        },
      ]),
    );
  }

  private splitPercentage(
    amount: number,
    currency: string,
    userIds: string[],
    customSplits: Record<string, number>,
  ): Record<string, { amount: number; currency: string }> {
    return Object.fromEntries(
      userIds.map((userId) => [
        userId,
        {
          amount: Number(((customSplits[userId] / 100) * amount).toFixed(2)),
          currency,
        },
      ]),
    );
  }
}
