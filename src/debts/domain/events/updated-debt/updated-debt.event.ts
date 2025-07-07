import { Debt } from '../../entities/debt';

export class UpdatedDebtEvent {
  constructor(public readonly debt: Debt) {}
}
