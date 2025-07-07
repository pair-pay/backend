export class UpdateUserDto {
  constructor(
    public readonly name?: string,
    public readonly image?: string,
  ) {}
}
