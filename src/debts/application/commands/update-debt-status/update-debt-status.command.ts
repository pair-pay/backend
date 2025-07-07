import { UpdateDebtStatusDto } from '../../dto/update-debt-status.dto';

export class UpdateDebtStatusCommand {
  constructor(public readonly data: UpdateDebtStatusDto) {}
}
