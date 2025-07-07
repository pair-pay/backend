import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ForbiddenException, ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let context: Partial<ExecutionContext>;
  let request: any;
  let mockReflector: any;

  beforeEach(() => {
    mockReflector = {
      getAllAndOverride: jest.fn(),
    };
    guard = new RolesGuard(mockReflector as Reflector);
    request = {};
    context = {
      switchToHttp: () => ({ getRequest: () => request }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as any;
  });

  it('should allow access if no roles are required', () => {
    mockReflector.getAllAndOverride.mockReturnValue(undefined);
    expect(guard.canActivate(context as ExecutionContext)).toBe(true);
  });

  it('should throw ForbiddenException if user has no role', () => {
    mockReflector.getAllAndOverride.mockReturnValue(['admin']);
    request.user = {};
    expect(() => guard.canActivate(context as ExecutionContext)).toThrow(
      ForbiddenException,
    );
  });

  it('should throw ForbiddenException if user role is insufficient', () => {
    mockReflector.getAllAndOverride.mockReturnValue(['admin']);
    request.user = { role: 'user' };
    expect(() => guard.canActivate(context as ExecutionContext)).toThrow(
      ForbiddenException,
    );
  });

  it('should allow access if user has required role', () => {
    mockReflector.getAllAndOverride.mockReturnValue(['admin', 'user']);
    request.user = { role: 'user' };
    expect(guard.canActivate(context as ExecutionContext)).toBe(true);
  });
});
