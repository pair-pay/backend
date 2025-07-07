export class GroupsInMemoryCacheEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}
}
