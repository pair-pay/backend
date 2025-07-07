import { DomainException } from "src/shared/domain/exceptions/domain.exception";

export class InvalidPromptException extends DomainException {
  /**
   * Creates a new InvalidPromptException instance.
   * @param {string} message - The error message
   */
  constructor(message: string) {
    super(message);
  }
}
