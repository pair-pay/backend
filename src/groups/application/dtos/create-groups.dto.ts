export class CreateGroupsDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly createdByUserId?: string,
  ) {}
}
