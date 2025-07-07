import { GroupPrimitive } from "./primitives/group.primitive";
import { GroupDescriptionValueObject } from "./value-objects/group-description.value-object";
import { GroupNameValueObject } from "./value-objects/group-name.value-object";

export class Group {
  constructor(
    public readonly id: string,
    public readonly name: GroupNameValueObject,
    public readonly description: GroupDescriptionValueObject,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  update(data: Partial<{ name: string; description: string }>): Group {
    return new Group(
      this.id,
      new GroupNameValueObject(data.name ?? this.name.value),
      new GroupDescriptionValueObject(
        data.description ?? this.description.value
      ),
      this.createdAt,
      this.updatedAt
    );
  }

  static fromPrimitives(primitives: GroupPrimitive): Group {
    return new Group(
      primitives.id,
      new GroupNameValueObject(primitives.name),
      new GroupDescriptionValueObject(primitives.description),
      new Date(primitives.createdAt),
      new Date(primitives.updatedAt)
    );
  }

  toPrimitives(): GroupPrimitive {
    return {
      id: this.id,
      name: this.name.value,
      description: this.description.value ?? "",
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
