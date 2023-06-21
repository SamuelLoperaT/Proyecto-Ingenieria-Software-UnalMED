import { StringValueObject } from '../../shared/domain/StringValueObject';
import { BoxTypeConstants } from './BoxTypeConstants';

export class BoxType extends StringValueObject {
  constructor(value: string) {
    super(value);
    BoxType.ensureIsValidParam(value);
  }

  static ensureIsValidParam(value: string) {
    if (!(Object.values(BoxTypeConstants) as Array<string>).includes(value)) {
      throw new Error(
        `Invalid value for BoxType: ${value}. Must be one of ${Object.values(
          BoxTypeConstants,
        ).join(', ')}.`,
      );
    }
  }
}
