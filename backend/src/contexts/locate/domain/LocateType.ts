import { StringValueObject } from '../../shared/domain/StringValueObject';
import { LocateTypeConstants } from './LocateTypeConstants';

export class LocateType extends StringValueObject {
  constructor(value: string) {
    super(value);
    LocateType.ensureIsValidParam(value);
  }

  static ensureIsValidParam(value: string) {
    if (
      !(Object.values(LocateTypeConstants) as Array<string>).includes(value)
    ) {
      throw new Error(
        `Invalid value for LocateType: ${value}. Must be one of ${Object.values(
          LocateTypeConstants,
        ).join(', ')}.`,
      );
    }
  }
}
