import { AuthTypeOrmEntity } from '../entities/auth-type-orm.entity';
import { Auth } from 'src/auth/domain/entities/auth.entity';

export class TypeOrmAuthMapper {
  static toDomain(entity: AuthTypeOrmEntity): Auth {
    // Construir el primitive manualmente, sin accessToken
    return Auth.fromPrimitives({
      ...entity,
      accessToken: undefined,
      accessTokenExpiresIn: undefined,
    });
  }

  static toPersistence(auth: Auth): AuthTypeOrmEntity {
    // Excluir accessToken y accessTokenExpiresIn
    const { accessToken, accessTokenExpiresIn, ...rest } = auth.toPrimitives();
    return rest as AuthTypeOrmEntity;
  }
}
