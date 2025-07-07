import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { AuthRepository } from '../../ports/auth.repository';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { AuthRefreshTokenValueObject } from 'src/auth/domain/value-objects/auth-refresh-token/auth-refresh-token.value-object';
import { JwtService } from 'src/auth/application/ports/jwt.service';

/**
 * Handler for the RefreshTokenCommand.
 * Validates the refresh token, generates new tokens and returns them.
 */
@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  private readonly logger = new Logger(RefreshTokenCommandHandler.name);

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    command: RefreshTokenCommand,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    this.logger.log('Executing refresh token command');
    const { refreshToken } = command;

    // Validar formato del refresh token antes de buscar
    if (!refreshToken || refreshToken.length < 16) {
      throw new UnauthorizedException('Invalid refresh token format');
    }

    // Buscar el Auth por refresh token
    const auth = await this.authRepository.findByRefreshToken(refreshToken);
    if (!auth) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // TODO: Validar expiración/revocación del refresh token si aplica

    // Generar un nuevo refresh token
    const newRefreshTokenVO = AuthRefreshTokenValueObject.generate();

    // Crear una nueva instancia de Auth con el refresh token actualizado
    const updatedAuth = auth.updateRefreshToken(newRefreshTokenVO);
    await this.authRepository.update(updatedAuth);

    // Generar el access token real (payload mínimo: userId y email)
    const payload = {
      userId: auth.userId,
      email: auth.email.value,
    };
    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: 15 * 60, // 15 minutos
    });

    return {
      accessToken,
      refreshToken: newRefreshTokenVO.value,
    };
  }
}
