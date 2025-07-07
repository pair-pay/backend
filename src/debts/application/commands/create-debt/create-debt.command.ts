import { Debt } from '../../../domain/entities/debt';
import { CreateDebtDto } from '../../dto/create-debt.dto';

export class CreateDebtCommand {
  constructor(public readonly data: CreateDebtDto) {}
}
