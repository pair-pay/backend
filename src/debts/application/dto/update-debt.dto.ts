export class UpdateDebtDto {
  constructor(
    public readonly id: string,
    public readonly amount?: number,
    public readonly currency?: string,
    public readonly status?: string,
  ) {}
}
