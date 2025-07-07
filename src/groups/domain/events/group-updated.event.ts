import { Group } from '../group';

export class GroupUpdatedEvent {
  constructor(public readonly group: Group) {}
}
