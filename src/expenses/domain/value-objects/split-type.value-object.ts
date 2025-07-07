import { SPLIT_TYPES } from '../constants/split-types.constant';
import { InvalidSplitTypeException } from '../exceptions/invalid-split-type.exception';

export class SplitTypeValueObject {
  constructor(public readonly value: string) {
    this.validate(value);
  }

  private validate(value: string): void {
    if (!Object.values(SPLIT_TYPES).includes(value)) {
      throw new InvalidSplitTypeException(
        `Invalid split type: ${value}. Valid split types are: ${Object.values(
          SPLIT_TYPES,
        ).join(', ')}`,
      );
    }
  }
}
