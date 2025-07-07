import { JwtAuthGuard } from './jwt-auth.guard';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';

// Mocks
const mockJwtService = {
  verify: jest.fn(),
};
const mockReflector = {
  getAllAndOverride: jest.fn(),
};

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let context: Partial<ExecutionContext>;
  let request: any;

  beforeEach(() => {
    jest.clearAllMocks();
    guard = new JwtAuthGuard(mockJwtService as any, mockReflector as any);
    request = {};
    context = {
      switchToHttp: () => ({ getRequest: () => request }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as any;
  });

  it('should allow access to public routes', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(true);
    await expect(guard.canActivate(context as ExecutionContext)).resolves.toBe(
      true,
    );
  });

  it('should throw UnauthorizedException if token is missing', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    request.headers = {};
    await expect(
      guard.canActivate(context as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    request.headers = { authorization: 'Bearer invalidtoken' };
    mockJwtService.verify.mockRejectedValue(new Error('Invalid token'));
    await expect(
      guard.canActivate(context as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should allow access and attach user if token is valid', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    request.headers = { authorization: 'Bearer validtoken' };
    const payload = { userId: '123', email: 'test@example.com' };
    mockJwtService.verify.mockResolvedValue(payload);
    await expect(guard.canActivate(context as ExecutionContext)).resolves.toBe(
      true,
    );
    expect((request as any).user).toEqual(payload);
  });
});
