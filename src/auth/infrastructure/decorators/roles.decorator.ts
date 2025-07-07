import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator to specify required roles for a route.
 * @param roles List of roles required
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
