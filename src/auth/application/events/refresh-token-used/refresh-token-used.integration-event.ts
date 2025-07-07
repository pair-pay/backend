export class RefreshTokenUsedIntegrationEvent {
  constructor(
    public readonly authId: string,
    public readonly userId: string,
    public readonly refreshToken: string,
    public readonly usedAt: Date,
  ) {}
}
