export class UpdateAuthCommand {
  constructor(
    public readonly id: string,
    public readonly data: Partial<{
      email: string;
      password: string;
      accessToken: string;
      refreshToken: string;
      isActive: boolean;
      role: string;
    }>,
  ) {}
}
