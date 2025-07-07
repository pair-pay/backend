import { InvalidPromptException } from '../exceptions/invalid-prompt.exception';
import { PromptPrimitive } from '../primitives/prompt.primitive';
import { PromptDescriptionValueObject } from '../value-objects/prompt-description/prompt-description.value-object';
import { PromptNameValueObject } from '../value-objects/prompt-name/prompt-name.value-object';
import { PromptTemplateValueObject } from '../value-objects/prompt-template/prompt-template.value-object';
import { PromptVersionValueObject } from '../value-objects/prompt-version/prompt-version.value-object';

/**
 * Represents a Prompt entity in the system.
 * @class
 */
export class Prompt {
  /**
   * Creates a new Prompt instance.
   * @param {string} id - The unique identifier of the prompt
   * @param {PromptNameValueObject} name - The name value object of the prompt
   * @param {PromptTemplateValueObject} template - The template value object of the prompt
   * @param {PromptVersionValueObject} version - The version value object of the prompt
   * @param {boolean} isDefault - Whether this prompt is the default one
   * @param {Date} createdAt - The creation timestamp
   * @param {Date} updatedAt - The last update timestamp
   * @param {string} [parentId] - Optional parent prompt identifier
   * @param {PromptDescriptionValueObject} [description] - Optional description value object
   */
  constructor(
    public readonly id: string,
    public readonly name: PromptNameValueObject,
    public readonly template: PromptTemplateValueObject,
    public readonly version: PromptVersionValueObject,
    public readonly isDefault: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly parentId?: string,
    public readonly description?: PromptDescriptionValueObject,
  ) {}

  /**
   * Parses and returns the variables found in the prompt template.
   * @returns {string[]} Array of variable names found in the template
   */
  parseVariables(): string[] {
    return this.template.parseVariables();
  }

  /**
   * Creates a new prompt with an incremented version.
   * @returns {Prompt} A new prompt instance with incremented version
   */
  incrementVersion(): Prompt {
    return new Prompt(
      this.id,
      this.name,
      this.template,
      new PromptVersionValueObject(this.version.incrementVersion()),
      this.isDefault,
      this.createdAt,
      new Date(Date.now()),
      this.parentId,
      this.description,
    );
  }

  /**
   * Creates a new prompt marked as default.
   * @returns {Prompt} A new prompt instance marked as default
   */
  setDefault(): Prompt {
    return new Prompt(
      this.id,
      this.name,
      this.template,
      this.version,
      true,
      this.createdAt,
      new Date(Date.now()),
      this.parentId,
      this.description,
    );
  }

  /**
   * Updates the prompt with new data.
   * @param {Partial<{name: string, template: string, description: string, isDefault: boolean}>} data - The data to update
   * @returns {Prompt} A new prompt instance with updated values
   */
  update(
    data: Partial<{
      name: string;
      template: string;
      description: string;
      isDefault: boolean;
    }>,
  ): Prompt {
    return new Prompt(
      this.id,
      new PromptNameValueObject(data.name ?? this.name.toString()),
      new PromptTemplateValueObject(data.template ?? this.template.value),
      new PromptVersionValueObject(this.version.value),
      data.isDefault ?? this.isDefault,
      this.createdAt,
      new Date(Date.now()),
      this.parentId,
      data.description
        ? new PromptDescriptionValueObject(data.description)
        : this.description,
    );
  }

  /**
   * Checks if this Prompt is equal to another Prompt by id.
   * @param {Prompt} other - The other Prompt to compare
   * @returns {boolean} True if both Prompts have the same id, false otherwise
   */
  equals(other: Prompt): boolean {
    return this.id === other.id;
  }

  /**
   * Clones this Prompt with a new id.
   * @param {string} newId - The id for the new Prompt
   * @returns {Prompt} A new Prompt instance with the new id and the same other properties
   */
  clone(newId: string): Prompt {
    return new Prompt(
      newId,
      this.name,
      this.template,
      this.version,
      this.isDefault,
      this.createdAt,
      this.updatedAt,
      this.parentId,
      this.description,
    );
  }

  /**
   * Validates the business invariants of the Prompt entity.
   * @throws {Error} If any business invariant is violated
   */
  validate(): void {
    // Example: a default prompt should not have a parentId
    if (this.isDefault && this.parentId) {
      throw new InvalidPromptException(
        'A default prompt cannot have a parentId.',
      );
    }
    // Example: name, template, version, and description are already validated by their value objects
  }

  /**
   * Returns a new Prompt with the given parentId.
   * @param {string} parentId - The new parentId to set
   * @returns {Prompt} A new Prompt instance with the updated parentId
   */
  setParent(parentId: string): Prompt {
    return new Prompt(
      this.id,
      this.name,
      this.template,
      this.version,
      this.isDefault,
      this.createdAt,
      new Date(Date.now()),
      parentId,
      this.description,
    );
  }

  /**
   * Gets the name value object.
   * @returns {PromptNameValueObject} The PromptNameValueObject instance
   */
  getName(): PromptNameValueObject {
    return this.name;
  }

  /**
   * Gets the template value object.
   * @returns {PromptTemplateValueObject} The PromptTemplateValueObject instance
   */
  getTemplate(): PromptTemplateValueObject {
    return this.template;
  }

  /**
   * Gets the description value object, if any.
   * @returns {PromptDescriptionValueObject | undefined} The PromptDescriptionValueObject instance or undefined
   */
  getDescription(): PromptDescriptionValueObject | undefined {
    return this.description;
  }

  /**
   * Gets the version value object.
   * @returns {PromptVersionValueObject} The PromptVersionValueObject instance
   */
  getVersion(): PromptVersionValueObject {
    return this.version;
  }

  /**
   * Creates a new Prompt instance from primitive values.
   * @param {PromptPrimitive} primitives - The primitive values to create the prompt from
   * @returns {Prompt} A new Prompt instance
   */
  static fromPrimitives(primitives: PromptPrimitive): Prompt {
    return new Prompt(
      primitives.id,
      new PromptNameValueObject(primitives.name),
      new PromptTemplateValueObject(primitives.template),
      new PromptVersionValueObject(primitives.version),
      primitives.isDefault,
      new Date(primitives.createdAt),
      new Date(primitives.updatedAt),
      primitives.parentId ?? undefined,
      primitives.description
        ? new PromptDescriptionValueObject(primitives.description)
        : undefined,
    );
  }

  /**
   * Converts the Prompt instance to primitive values.
   * @returns {PromptPrimitive} The primitive representation of the prompt
   */
  toPrimitives(): PromptPrimitive {
    return {
      id: this.id,
      name: this.name.toString(),
      template: this.template.toString(),
      description: this.description?.value ?? undefined,
      version: this.version.value,
      isDefault: this.isDefault,
      parentId: this.parentId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
