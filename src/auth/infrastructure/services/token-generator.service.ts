import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

/**
 * Service for generating secure random tokens (e.g., for password reset).
 * Uses Node.js crypto for strong randomness.
 */
@Injectable()
export class TokenGeneratorService {
  /**
   * Generates a secure random token as a hex string.
   * @param length Number of bytes (default: 32, for 64 hex chars)
   * @returns Secure random token string
   */
  generate(length = 32): string {
    return randomBytes(length).toString('hex');
  }
}
