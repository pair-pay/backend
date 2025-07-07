import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Request } from 'express';

/**
 * Guard for validating user roles.
 * Checks if the user has at least one of the required roles for the route.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    this.logger.log('Checking roles');

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      // No roles required, allow access
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as any).user;
    if (!user || !user.role) {
      throw new ForbiddenException('User role not found');
    }
    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException('Insufficient role');
    }
    return true;
  }
}
