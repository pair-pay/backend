export class AuthDeletedIntegrationEvent {
  constructor(
    public readonly authId: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly deletedAt: Date,
  ) {}
}
