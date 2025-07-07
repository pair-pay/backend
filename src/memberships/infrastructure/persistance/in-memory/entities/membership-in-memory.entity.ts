export class MembershipInMemoryEntity {
  constructor(
    public readonly id: string,
    public readonly groupId: string,
    public readonly userId: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}
}
