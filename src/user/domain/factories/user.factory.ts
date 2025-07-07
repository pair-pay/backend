import { randomUUID } from 'node:crypto';
import { User } from '../entities/user.entity';
import { NameValueObject } from '../value-objects/name.value-object';
import { Injectable } from '@nestjs/common';
import { UserImageValueObject } from '../value-objects/user-image/user-image.value-object';

/**
 * Factory class for creating User domain objects
 */
@Injectable()
export class UserFactory {
  /**
   * Creates a new User domain object
   * @param data - The data to create the User from
   * @returns A new User domain object
   */
  create(data: { name: string; image?: string }): User {
    return new User(
      randomUUID(),
      new NameValueObject(data.name),
      new UserImageValueObject(data.image),
      new Date(),
      new Date(),
    );
  }
}
