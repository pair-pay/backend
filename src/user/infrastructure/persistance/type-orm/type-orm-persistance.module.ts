import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmEntity } from './entities/user-type-orm.entity';
import { UserRepository } from 'src/user/application/ports/user.repository';
import { TypeOrmUsersRepository } from './repositories/user-type-orm.repository';

@Module({
  // Here we are importing the entities that we want to use in the repository
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUsersRepository,
    },
  ],
  exports: [UserRepository],
})
export class UsersTypeOrmPersistanceModule {}
