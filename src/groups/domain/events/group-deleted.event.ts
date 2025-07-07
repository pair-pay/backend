import { Group } from '../group';

export class GroupDeletedEvent {
  constructor(public readonly group: Group) {}
}
