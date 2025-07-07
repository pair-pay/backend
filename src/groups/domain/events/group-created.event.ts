import { Group } from '../group';

export class GroupCreatedEvent {
  constructor(public readonly group: Group) {}
}
