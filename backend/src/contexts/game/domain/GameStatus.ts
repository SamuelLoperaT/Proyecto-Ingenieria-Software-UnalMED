import { StringValueObject } from '../../shared/domain/StringValueObject';
import { GameStatusConstants } from './GameStatusConstants';

export class GameStatus extends StringValueObject {
  constructor(value: string) {
    GameStatus.ensureIsValidParam(value);
    super(value);
  }

  static ensureIsValidParam(value: string) {
    if (
      !(Object.values(GameStatusConstants) as Array<string>).includes(value)
    ) {
      throw new Error('Invalid game status');
    }
  }
}
