export class UserLoggedInIntegrationEvent {
  constructor(
    public readonly authId: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly lastLogin: Date,
  ) {}
}
