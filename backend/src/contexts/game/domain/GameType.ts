import { StringValueObject } from '../../shared/domain/StringValueObject';
import { GameTypesConstants } from './GameTypesConstants';

export class GameType extends StringValueObject {
  constructor(value: string) {
    GameType.ensureIsValidParam(value);
    super(value);
  }

  static ensureIsValidParam(value: string) {
    if (!(Object.values(GameTypesConstants) as Array<string>).includes(value)) {
      throw new Error('Invalid game status');
    }
  }
}
