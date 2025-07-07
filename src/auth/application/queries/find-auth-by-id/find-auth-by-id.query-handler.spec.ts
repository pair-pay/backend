import { FindAuthByIdQueryHandler } from './find-auth-by-id.query-handler';
import { FindAuthByIdQuery } from './find-auth-by-id.query';
import { AuthRepository } from '../../ports/auth.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { NotFoundException } from '@nestjs/common';
import { AuthRoles } from 'src/auth/domain/constants/auth-roles.constant';

// Helper to create an example Auth
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

describe('FindAuthByIdQueryHandler', () => {
  let handler: FindAuthByIdQueryHandler;
  let authRepository: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepository = { findById: jest.fn() } as any;
    handler = new FindAuthByIdQueryHandler(authRepository);
  });

  it('should return Auth if found', async () => {
    const auth = createAuth();
    authRepository.findById.mockResolvedValueOnce(auth);
    const query = new FindAuthByIdQuery('auth-id');
    const result = await handler.execute(query);
    expect(authRepository.findById).toHaveBeenCalledWith('auth-id');
    expect(result).toBe(auth);
  });

  it('should throw NotFoundException if not found', async () => {
    authRepository.findById.mockResolvedValueOnce(undefined as any);
    const query = new FindAuthByIdQuery('notfound');
    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
  });
});
