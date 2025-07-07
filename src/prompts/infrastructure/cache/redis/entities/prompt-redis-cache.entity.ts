export class PromptRedisCacheEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly template: string,
    public readonly version: number,
    public readonly isDefault: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly parentId?: string,
    public readonly description?: string,
  ) {}
}
