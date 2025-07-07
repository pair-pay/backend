import { InvalidGroupNameException } from '../exceptions/invalid-group-name.exception';

export class GroupNameValueObject {
  constructor(public readonly value: string) {
    this.value = this.format(value);
    this.validate(this.value);
  }

  private format(value: string): string {
    if (!value) {
      throw new InvalidGroupNameException(
        `Group name must be provided, got ${value}`,
      );
    }
    return value.trim();
  }

  private validate(value: string): void {
    if (value.length < 2) {
      throw new InvalidGroupNameException(
        `Group name must be at least 2 characters long, got ${value}`,
      );
    }
  }

  toJSON(): string {
    return this.value;
  }
}
