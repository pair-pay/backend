import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '../../ports/jwt.service';
import { Auth } from '../../../domain/entities/auth.entity';
import { AuthAccessTokenValueObject } from '../../../domain/value-objects/auth-access-token/auth-access-token.value-object';

/**
 * Servicio de aplicación para la generación y asignación de access tokens a la entidad Auth.
 */
@Injectable()
export class AuthTokenService {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  /**
   * Genera y asigna un access token a la entidad Auth.
   * @param auth Entidad Auth a la que se le asignará el token.
   */
  async generateAccessToken(auth: Auth): Promise<AuthAccessTokenValueObject> {
    const payload = {
      userId: auth.userId,
      email: auth.email.value,
      role: auth.role.value,
    };
    const token = await this.jwtService.sign(payload);
    const decoded: any = await this.jwtService.verify(token);
    const accessToken = AuthAccessTokenValueObject.fromJwtPayload(
      token,
      decoded,
    );
    return accessToken;
  }
}
