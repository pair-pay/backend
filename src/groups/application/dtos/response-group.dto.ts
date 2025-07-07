import { ResponseUserDto } from 'src/user/application/dtos/response-user.dto';

export class ResponseGroupDto {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly name: string,
    public readonly description: string,
    public readonly users?: ResponseUserDto[],
  ) {}
}
