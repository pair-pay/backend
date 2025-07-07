import { InvalidActionException } from '../exceptions/invalid-action.exception';

export class MessageValueObject {
  constructor(public readonly value: string) {
    this.validate(value);
  }

  private validate(value: string) {
    if (value.length === 0) {
      throw new InvalidActionException('Action cannot be empty');
    }
  }
}
