export class CreateMembershipCommand {
  constructor(
    public readonly groupId: string,
    public readonly userId: string,
  ) {}
}
