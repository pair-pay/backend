export class PasswordResetRequestedIntegrationEvent {
  constructor(
    public readonly authId: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly requestedAt: Date,
  ) {}
}
