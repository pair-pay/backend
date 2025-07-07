import { AmountValueObject } from './debt-amount.value-object';
import { InvalidAmountException } from '../../exceptions/invalid-debt-amount.exception';
import { InvalidCurrencyException } from '../../exceptions/invalid-debt-currency.exception';

describe('AmountValueObject', () => {
  it('should create a valid value object', () => {
    const vo = new AmountValueObject(100, 'EUR');
    expect(vo.value).toBe(100);
    expect(vo.currency).toBe('EUR');
  });

  it('should throw if amount is 0', () => {
    expect(() => new AmountValueObject(0, 'EUR')).toThrow(
      InvalidAmountException,
    );
  });

  it('should throw if amount is negative', () => {
    expect(() => new AmountValueObject(-5, 'EUR')).toThrow(
      InvalidAmountException,
    );
  });

  it('should throw if currency is empty', () => {
    expect(() => new AmountValueObject(100, '')).toThrow(
      InvalidCurrencyException,
    );
  });

  it('should throw if currency is not valid', () => {
    expect(() => new AmountValueObject(100, 'INVALID')).toThrow(
      InvalidCurrencyException,
    );
  });

  it('should return correct JSON', () => {
    const vo = new AmountValueObject(50, 'EUR');
    expect(vo.toJSON()).toEqual({ value: 50, currency: 'EUR' });
  });
});
