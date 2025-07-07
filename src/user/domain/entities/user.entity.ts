import { UserPrimitive } from '../primitives/user.primitive';
import { NameValueObject } from '../value-objects/name.value-object';
import { UserImageValueObject } from '../value-objects/user-image/user-image.value-object';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: NameValueObject,
    public readonly image: UserImageValueObject,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  /**
   * Updates the user with the given data
   * @param data - The data to update the user with
   * @returns A new User instance with the updated data
   */
  update(data: Partial<{ name: string; image: string }>): User {
    return new User(
      this.id,
      new NameValueObject(data.name ?? this.name.value),
      new UserImageValueObject(data.image ?? this.image.value),
      this.createdAt,
      new Date(),
    );
  }

  /**
   * Creates a new User instance from a primitive object
   * @param primitives - The primitive object to create the User from
   * @returns A new User instance
   */
  static fromPrimitives(primitives: UserPrimitive): User {
    return new User(
      primitives.id,
      new NameValueObject(primitives.name),
      new UserImageValueObject(primitives.image),
      new Date(primitives.createdAt),
      new Date(primitives.updatedAt),
    );
  }

  /**
   * Converts the User instance to a primitive object
   * @returns A primitive object
   */
  toPrimitives(): UserPrimitive {
    return {
      id: this.id,
      name: this.name.value,
      image: this.image.value,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
