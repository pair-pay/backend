export class GetMembershipByUserIdGroupIdQuery {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
