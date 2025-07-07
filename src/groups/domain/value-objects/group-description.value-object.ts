import { InvalidGroupDescriptionException } from '../exceptions/invalid-group-description.exception';

export class GroupDescriptionValueObject {
  constructor(public readonly value: string | null | undefined) {
    this.value = this.format(value);
    this.validate(this.value);
  }

  private format(value: string | null | undefined): string | null | undefined {
    if (!value) return value;
    return value.trim();
  }

  private validate(value: string | null | undefined): void {
    if (!value) return;
    if (value.length >= 255) {
      throw new InvalidGroupDescriptionException(
        `Group description must be less than 255 characters, got ${value}`,
      );
    }
  }

  toJSON(): string {
    return this.value;
  }
}
