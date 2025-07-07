export class PasswordResetCompletedIntegrationEvent {
  constructor(
    public readonly authId: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly completedAt: Date,
  ) {}
}
