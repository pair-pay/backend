/**
 * Command to refresh authentication tokens using a refresh token.
 */
export class RefreshTokenCommand {
  /**
   * @param refreshToken The refresh token string
   */
  constructor(public readonly refreshToken: string) {}
}
