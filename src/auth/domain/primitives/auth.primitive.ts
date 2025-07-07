export interface AuthPrimitive {
  id: string;
  userId: string;
  refreshToken: string;
  email: string;
  password: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  isActive: boolean;
  role: string;
  firstLogin: Date;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
}
