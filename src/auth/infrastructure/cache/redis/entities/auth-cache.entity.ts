export class AuthRedisCacheEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly password: string,
    public readonly refreshToken: string,
    public readonly isActive: boolean,
    public readonly role: string,
    public readonly firstLogin: Date,
    public readonly lastLogin: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
