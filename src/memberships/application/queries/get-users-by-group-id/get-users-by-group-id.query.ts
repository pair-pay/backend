/**
 * Query to get all users of a group by groupId
 */
export class GetUsersByGroupIdQuery {
  constructor(public readonly groupId: string) {}
}
