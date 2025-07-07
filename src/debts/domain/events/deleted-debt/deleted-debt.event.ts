import { Debt } from '../../entities/debt';

export class DeletedDebtEvent {
  constructor(public readonly debt: Debt) {}
}
