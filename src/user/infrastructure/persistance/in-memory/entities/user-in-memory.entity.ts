export class UserInMemoryEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly image: string | null,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}
}
