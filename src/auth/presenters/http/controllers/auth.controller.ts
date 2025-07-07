import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AuthService } from 'src/auth/application/services/auth/auth.service';
import { AuthDto } from '../dtos/auth.dto';
import { RegisterUserByEmailCommand } from 'src/auth/application/commands/register-user-by-email/register-user-by-email.command';
import { AuthHttpMapper } from '../mapper/auth-http.mapper';
import { LoginUserByEmailCommand } from 'src/auth/application/commands/login-user-by-email/login-user-by-email.command';
import { RefreshTokenRequestDto } from '../dtos/refresh-token-request.dto';
import { RefreshTokenResponseDto } from '../dtos/refresh-token-response.dto';
import { RefreshTokenCommand } from 'src/auth/application/commands/refresh-token/refresh-token.command';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { RequestPasswordResetCommand } from 'src/auth/application/commands/request-password-reset/request-password-reset.command';
import { ResetPasswordRequestDto } from '../dtos/reset-password-request.dto';
import { ResetPasswordCommand } from 'src/auth/application/commands/reset-password/reset-password.command';
import { ResetPasswordConfirmRequestDto } from '../dtos/reset-password-confirm-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';

/**
 * Controller for handling HTTP requests related to authentication and authorization.
 */
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('')
  @ApiOperation({ summary: 'Find all auth records' })
  @ApiResponse({ status: 200, description: 'Auth records found' })
  async findAllAuths(): Promise<AuthResponseDto[]> {
    const auths = await this.authService.findAll();
    return auths.map(AuthHttpMapper.toResponseDto);
  }

  /**
   * Find an auth record by email address
   * @param email The email address to search for
   * @returns The auth record if found
   */
  @Get('/email/find')
  @ApiOperation({ summary: 'Find auth record by email' })
  @ApiQuery({ name: 'email', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Auth record found' })
  @ApiResponse({ status: 404, description: 'Auth record not found' })
  async findAuthByEmail(
    @Query('email') email: string,
  ): Promise<AuthResponseDto> {
    const auth = await this.authService.findAuthByEmail(email);
    return AuthHttpMapper.toResponseDto(auth);
  }

  @Get('/id/find')
  @ApiOperation({ summary: 'Find auth record by id' })
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Auth record found' })
  @ApiResponse({ status: 404, description: 'Auth record not found' })
  async findAuthById(@Query('id') id: string): Promise<AuthResponseDto> {
    const auth = await this.authService.findAuthById(id);
    return AuthHttpMapper.toResponseDto(auth);
  }

  @Post('/email/register')
  async registerUserByEmail(@Body() registerDto: AuthDto) {
    const auth = await this.authService.registerUserByEmail(
      new RegisterUserByEmailCommand(registerDto),
    );
    return AuthHttpMapper.toResponseDto(auth);
  }

  @Post('/email/login')
  async loginUserByEmail(@Body() registerDto: AuthDto) {
    const auth = await this.authService.loginUserByEmail(
      new LoginUserByEmailCommand(registerDto),
    );
    return AuthHttpMapper.toResponseDto(auth);
  }

  /**
   * Refresh authentication tokens using a refresh token.
   */
  @Post('/refresh')
  @ApiBody({ type: RefreshTokenRequestDto })
  @ApiResponse({ status: 200, type: RefreshTokenResponseDto })
  async refreshToken(
    @Body() dto: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      new RefreshTokenCommand(dto.refreshToken),
    );
    return AuthHttpMapper.toRefreshTokenResponseDto(accessToken, refreshToken);
  }

  @Post('/password/reset')
  async requestPasswordReset(@Body() dto: ResetPasswordRequestDto) {
    await this.authService.requestPasswordReset(
      new RequestPasswordResetCommand(dto.email),
    );
  }

  @Post('/password/reset/confirm')
  async confirmPasswordReset(@Body() dto: ResetPasswordConfirmRequestDto) {
    await this.authService.resetPassword(
      new ResetPasswordCommand(dto.email, dto.token, dto.newPassword),
    );
  }
}
