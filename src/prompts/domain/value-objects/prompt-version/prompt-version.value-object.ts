import { Logger } from "@nestjs/common";

export class PromptVersionValueObject {
  private readonly logger: Logger = new Logger(PromptVersionValueObject.name);

  constructor(public readonly value: number) {
    this.validate(this.value);
  }

  private validate(value: number): void {
    this.logger.debug(`Validating prompt version: ${value}`);
    if (value < 1) {
      throw new Error("Prompt version must be greater than 0");
    }
  }

  incrementVersion(): number {
    return this.value + 1;
  }

  equals(other: PromptVersionValueObject): boolean {
    this.logger.debug(
      `Comparing prompt versions: ${this.value} and ${other.value}`
    );
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toString();
  }

  toJson(): { value: number } {
    return {
      value: this.value,
    };
  }
}
