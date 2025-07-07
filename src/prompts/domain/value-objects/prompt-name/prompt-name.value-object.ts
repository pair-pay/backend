import { Logger } from "@nestjs/common";

export class PromptNameValueObject {
  private readonly logger: Logger = new Logger(PromptNameValueObject.name);

  constructor(public readonly value: string) {
    this.value = this.format(value);
    this.validate(this.value);
  }

  private format(value: string): string {
    this.logger.debug(`Formatting prompt name: ${value}`);
    return value.trim().toLowerCase().replace(/\s+/g, "-");
  }

  private validate(value: string): void {
    this.logger.debug(`Validating prompt name: ${value}`);
    if (value.length < 3) {
      throw new Error("Prompt name must be at least 3 characters long");
    }
  }

  equals(other: PromptNameValueObject): boolean {
    this.logger.debug(
      `Comparing prompt names: ${this.value} and ${other.value}`
    );
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  toJson(): { value: string } {
    return {
      value: this.value,
    };
  }
}
