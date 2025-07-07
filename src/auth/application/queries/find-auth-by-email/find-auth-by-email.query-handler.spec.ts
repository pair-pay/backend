import { FindAuthByEmailQueryHandler } from './find-auth-by-email.query-handler';
import { FindAuthByEmailQuery } from './find-auth-by-email.query';
import { AuthRepository } from '../../ports/auth.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { NotFoundException } from '@nestjs/common';
import { AuthRoles } from 'src/auth/domain/constants/auth-roles.constant';

// Helper para crear un Auth de ejemplo
function createAuth(): Auth {
  return Auth.fromPrimitives({
    id: 'auth-id',
    userId: 'user-id',
    email: 'test@example.com',
    password: '$2b$10$abcdefghijklmnopqrstuv', // hash dummy
    accessToken: 'access-token',
    accessTokenExpiresIn: Date.now() + 100000,
    refreshToken: 'refresh-token-123456789012',
    isActive: true,
    role: AuthRoles.USER,
    firstLogin: new Date('2023-01-01T00:00:00Z'),
    lastLogin: new Date('2023-01-02T00:00:00Z'),
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z'),
    resetPasswordToken: undefined,
    resetPasswordTokenExpiresAt: undefined,
  });
}

describe('FindAuthByEmailQueryHandler', () => {
  let handler: FindAuthByEmailQueryHandler;
  let authRepository: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepository = { findByEmail: jest.fn() } as any;
    handler = new FindAuthByEmailQueryHandler(authRepository);
  });

  it('should return Auth if found', async () => {
    const auth = createAuth();
    authRepository.findByEmail.mockResolvedValueOnce(auth);
    const query = new FindAuthByEmailQuery('test@example.com');
    const result = await handler.execute(query);
    expect(authRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(result).toBe(auth);
  });

  it('should throw NotFoundException if not found', async () => {
    authRepository.findByEmail.mockResolvedValueOnce(undefined as any);
    const query = new FindAuthByEmailQuery('notfound@example.com');
    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
  });
});
