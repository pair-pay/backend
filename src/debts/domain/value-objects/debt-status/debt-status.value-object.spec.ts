import { DebtStatusValueObject } from './debt-status.value-object';
import { DebtStatus } from '../../constants/debt-status.constant';
import { InvalidDebtStatusException } from '../../exceptions/invalid-debt-status.exception';

describe('DebtStatusValueObject', () => {
  it('should create a valid value object', () => {
    const vo = new DebtStatusValueObject(DebtStatus.PENDING);
    expect(vo.value).toBe(DebtStatus.PENDING);
  });

  it('should throw if status is invalid', () => {
    expect(() => new DebtStatusValueObject('invalid')).toThrow(
      InvalidDebtStatusException,
    );
  });

  it('should return correct JSON', () => {
    const vo = new DebtStatusValueObject(DebtStatus.PAID);
    expect(vo.toJson()).toBe(DebtStatus.PAID);
  });
});
