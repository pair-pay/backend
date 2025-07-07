export class UserRegisteredIntegrationEvent {
  constructor(
    public readonly authId: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly firstLogin: Date,
  ) {}
}
