import { StringValueObject } from './StringValueObject';
import { ColorConstants } from './ColorConstants';
import { BadRequestException } from '@nestjs/common';

export class Color extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (!this.ensureValid(value)) {
      throw new BadRequestException('Invalid color');
    }
  }

  ensureValid(value: string): boolean {
    return (Object.values(ColorConstants) as Array<string>).includes(value);
  }
}
