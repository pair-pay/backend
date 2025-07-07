import { MembershipPrimitive } from '../primitives/membership.primitive';

export class Membership {
  constructor(
    public readonly id: string,
    public readonly groupId: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromPrimitives(primitives: MembershipPrimitive): Membership {
    return new Membership(
      primitives.id,
      primitives.groupId,
      primitives.userId,
      new Date(primitives.createdAt),
      new Date(primitives.updatedAt),
    );
  }

  toPrimitives(): MembershipPrimitive {
    return {
      id: this.id,
      groupId: this.groupId,
      userId: this.userId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
