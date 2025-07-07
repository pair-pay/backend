import { UpdateDebtDto } from '../../dto/update-debt.dto';

export class UpdateDebtCommand {
  constructor(public readonly data: UpdateDebtDto) {}
}
