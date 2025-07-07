import { FindAllAuthsQueryHandler } from './find-all-auths.query-handler';
import { FindAllAuthsQuery } from './find-all-auths.query';
import { AuthRepository } from '../../ports/auth.repository';
import { Auth } from 'src/auth/domain/entities/auth.entity';
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

describe('FindAllAuthsQueryHandler', () => {
  let handler: FindAllAuthsQueryHandler;
  let authRepository: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    authRepository = { findAll: jest.fn() } as any;
    handler = new FindAllAuthsQueryHandler(authRepository);
  });

  it('should return Auths if found', async () => {
    const auth = createAuth();
    authRepository.findAll.mockResolvedValueOnce([auth]);
    const query = new FindAllAuthsQuery();
    const result = await handler.execute(query);
    expect(authRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([auth]);
  });

  it('should return an empty array if no auths are found', async () => {
    authRepository.findAll.mockResolvedValueOnce([]);
    const query = new FindAllAuthsQuery();
    const result = await handler.execute(query);
    expect(result).toEqual([]);
  });
});
