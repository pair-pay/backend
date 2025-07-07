import { Logger } from "@nestjs/common";

export class PromptTemplateValueObject {
  private readonly logger: Logger = new Logger(PromptTemplateValueObject.name);

  constructor(public readonly value: string) {
    this.value = this.format(value);
    this.validate(this.value);
  }

  private format(value: string): string {
    this.logger.debug(`Formatting prompt template: ${value}`);
    return value.trim().toLowerCase().replace(/\s+/g, "-");
  }

  private validate(value: string): void {
    this.logger.debug(`Validating prompt template: ${value}`);
    if (value.length < 3) {
      throw new Error("Prompt template must be at least 3 characters long");
    }
  }

  // TODO: parse variables from template
  parseVariables(): string[] {
    return (
      this.value
        .match(/{{.*?}}/g)
        ?.map((variable) => variable.replace("{{", "").replace("}}", "")) ?? []
    );
  }

  equals(other: PromptTemplateValueObject): boolean {
    this.logger.debug(
      `Comparing prompt templates: ${this.value} and ${other.value}`
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
