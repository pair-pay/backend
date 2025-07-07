export class UpdateDebtStatusDto {
  constructor(
    public readonly id: string,
    public readonly status: string,
  ) {}
}
