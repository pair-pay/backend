export class ResponseUserDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly image: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
