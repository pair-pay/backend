import { DynamicModule, Module } from '@nestjs/common';
import { AuthApplicationModule } from './application/services/auth-application.module';
import { AuthDomainModule } from './domain/auth-domain.module';
import { AuthInfrastructureModule } from './infrastructure/auth-infrastructure.module';
import { AuthController } from './presenters/http/controllers/auth.controller';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { DebtsInfrastructureModule } from 'src/debts/infrastructure/debts-infrastructure.module';

@Module({})
export class AuthModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        AuthDomainModule,
        AuthApplicationModule,
        DebtsInfrastructureModule.use(
          options.databaseDriver,
          options.cacheDriver,
        ),
      ],
      exports: [AuthApplicationModule, AuthInfrastructureModule],
    };
  }
}
