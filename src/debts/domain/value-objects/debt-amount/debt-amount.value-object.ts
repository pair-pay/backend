import { Logger } from '@nestjs/common';
import { InvalidAmountException } from '../../exceptions/invalid-debt-amount.exception';
import { InvalidCurrencyException } from '../../exceptions/invalid-debt-currency.exception';
import { CURRENCY_SYMBOL } from 'src/common/constants/currency.constant';

export class AmountValueObject {
  private readonly logger = new Logger(AmountValueObject.name);

  constructor(
    public readonly value: number,
    public readonly currency: string,
  ) {
    this.validateAmount(this.value);
    this.validateCurrency(this.currency);
  }

  private validateAmount(amount: number) {
    this.logger.debug(`Validating amount: ${amount}`);

    if (!amount) {
      this.logger.error(`Invalid amount: ${amount}`);
      throw new InvalidAmountException(
        `Invalid amount: ${amount}, amount cannot be empty`,
      );
    }

    if (amount < 0) {
      this.logger.error(`Invalid amount: ${amount}`);
      throw new InvalidAmountException(
        `Invalid amount: ${amount}, amount cannot be negative`,
      );
    }
  }

  private validateCurrency(currency: string) {
    this.logger.debug(`Validating currency: ${currency}`);

    if (!currency) {
      this.logger.error(`Invalid currency: ${currency}`);
      throw new InvalidCurrencyException(
        `Invalid currency: ${currency}, currency cannot be empty`,
      );
    }

    if (!Object.values(CURRENCY_SYMBOL).includes(currency as CURRENCY_SYMBOL)) {
      this.logger.error(`Invalid currency: ${currency}`);
      throw new InvalidCurrencyException(
        `Invalid currency: ${currency}, currency must be a valid currency`,
      );
    }
  }

  toJSON(): { value: number; currency: string } {
    return { value: this.value, currency: this.currency };
  }
}
