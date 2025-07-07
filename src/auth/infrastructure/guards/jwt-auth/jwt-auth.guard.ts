import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from 'src/auth/application/ports/jwt.service';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/auth/infrastructure/decorators/public.decorator';

/**
 * Guard for validating JWT authentication.
 * Implements scalable, DDD-aligned logic for extracting and validating JWTs.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('Checking JWT authentication');

    // Public routes
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // Private routes
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }
    try {
      const payload = await this.jwtService.verify(token);
      // Puedes mapear el payload a un User domain object aquí si lo necesitas
      (request as any).user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Extracts the JWT token from the Authorization header.
   * @param request Express request
   * @returns The JWT token string or null
   */
  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) return null;
    return token;
  }
}
