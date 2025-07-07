import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserByEmailCommand } from '../../commands/register-user-by-email/register-user-by-email.command';
import { LoginUserByEmailCommand } from '../../commands/login-user-by-email/login-user-by-email.command';
import { RefreshTokenCommand } from '../../commands/refresh-token/refresh-token.command';
import { RequestPasswordResetCommand } from '../../commands/request-password-reset/request-password-reset.command';
import { ResetPasswordCommand } from '../../commands/reset-password/reset-password.command';
import { FindAuthByEmailQuery } from '../../queries/find-auth-by-email/find-auth-by-email.query';
import { Auth } from 'src/auth/domain/entities/auth.entity';
import { FindAllAuthsQuery } from '../../queries/find-all-auths/find-all-auths.query';
import { FindAuthByIdQuery } from '../../queries/find-auth-by-id/find-auth-by-id.query';
import { ResponseAuthDto } from '../../dtos/response-auth.dto';

/**
 * Service for handling authentication and authorization use cases.
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async findAll(): Promise<ResponseAuthDto[]> {
    return this.queryBus.execute(new FindAllAuthsQuery());
  }

  async findAuthByEmail(email: string): Promise<ResponseAuthDto> {
    return this.queryBus.execute(new FindAuthByEmailQuery(email));
  }

  async findAuthById(id: string): Promise<ResponseAuthDto> {
    return this.queryBus.execute(new FindAuthByIdQuery(id));
  }

  async registerUserByEmail(
    command: RegisterUserByEmailCommand,
  ): Promise<ResponseAuthDto> {
    return this.commandBus.execute(command);
  }

  async loginUserByEmail(
    command: LoginUserByEmailCommand,
  ): Promise<ResponseAuthDto> {
    return this.commandBus.execute(command);
  }

  /**
   * Handles the refresh token use case.
   * @param command The RefreshTokenCommand
   * @returns Promise<{ accessToken: string; refreshToken: string }>
   */
  async refreshToken(
    command: RefreshTokenCommand,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.commandBus.execute(command);
  }

  /**
   * Handles the request password reset use case.
   * @param command The RequestPasswordResetCommand
   * @returns Promise<void>
   */
  async requestPasswordReset(command: RequestPasswordResetCommand) {
    return this.commandBus.execute(command);
  }

  /**
   * Handles the reset password use case.
   * @param command The ResetPasswordCommand
   * @returns Promise<void>
   */
  async resetPassword(command: ResetPasswordCommand) {
    return this.commandBus.execute(command);
  }
}
