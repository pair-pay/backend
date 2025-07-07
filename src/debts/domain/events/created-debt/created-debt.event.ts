import { Debt } from '../../entities/debt';

export class CreatedDebtEvent {
  constructor(public readonly debt: Debt) {}
}
