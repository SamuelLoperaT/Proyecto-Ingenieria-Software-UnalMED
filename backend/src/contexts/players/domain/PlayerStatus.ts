import { BadRequestException } from '@nestjs/common';
import { PlayerStatusConstants } from './PlayerStatusConstants';
import { StringValueObject } from '../../shared/domain/StringValueObject';

export class PlayerStatus extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (!this.ensureValid(value)) {
      throw new BadRequestException('Invalid player status');
    }
  }

  ensureValid(value: string): boolean {
    return (Object.values(PlayerStatusConstants) as Array<string>).includes(
      value,
    );
  }
}
