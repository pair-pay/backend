import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTypeOrmEntity } from './entities/auth-type-orm.entity';
import { TypeOrmAuthRepository } from './repositories/auth-type-orm.repository';
import { AuthRepository } from 'src/auth/application/ports/auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthTypeOrmEntity])],
  providers: [
    {
      provide: AuthRepository,
      useClass: TypeOrmAuthRepository,
    },
  ],
  exports: [AuthRepository],
})
export class AuthTypeOrmPersistanceModule {}
