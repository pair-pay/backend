import { DynamicModule, Module, Type } from '@nestjs/common';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { AuthInfrastructureModule } from '../../infrastructure/auth-infrastructure.module';
import { RegisterUserByEmailCommandHandler } from '../commands/register-user-by-email/register-user-by-email.command-handler';
import { AuthCreatedEventHandler } from '../event-handlers/auth-created/auth-created.event-handler';
import { AuthUpdatedEventHandler } from '../event-handlers/auth-updated/auth-updated.event-handler';
import { AuthDeletedEventHandler } from '../event-handlers/auth-deleted/auth-deleted.event-handler';
import { AuthController } from '../../presenters/http/controllers/auth.controller';
import { AuthDomainModule } from '../../domain/auth-domain.module';
import { AuthService } from './auth/auth.service';
import { AuthTokenService } from './auth-token/auth-token.service';
import { LoginUserByEmailCommandHandler } from '../commands/login-user-by-email/login-user-by-email.command-handler';
import { RefreshTokenCommandHandler } from '../commands/refresh-token/refresh-token.command-handler';
import { ResetPasswordCommandHandler } from '../commands/reset-password/reset-password.command-handler';
import { FindAuthByEmailQueryHandler } from '../queries/find-auth-by-email/find-auth-by-email.query-handler';
import { FindAuthByIdQueryHandler } from '../queries/find-auth-by-id/find-auth-by-id.query-handler';
import { FindAllAuthsQueryHandler } from '../queries/find-all-auths/find-all-auths.query-handler';

const CommandHandlers = [
  RegisterUserByEmailCommandHandler,
  LoginUserByEmailCommandHandler,
  RefreshTokenCommandHandler,
  ResetPasswordCommandHandler,
];

const QueryHandlers = [
  FindAuthByEmailQueryHandler,
  FindAuthByIdQueryHandler,
  FindAllAuthsQueryHandler,
];

const EventHandlers = [
  AuthCreatedEventHandler,
  AuthUpdatedEventHandler,
  AuthDeletedEventHandler,
];

@Module({
  imports: [AuthDomainModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthTokenService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class AuthApplicationModule {
  static withInfrastructure(
    infrastructureModule: Type | DynamicModule,
    options: ApplicationBootstrapOptions,
  ) {
    return {
      module: AuthApplicationModule,
      imports: [
        infrastructureModule,
        AuthInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
    };
  }
}
