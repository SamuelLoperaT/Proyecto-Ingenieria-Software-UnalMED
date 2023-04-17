import { IdObject } from '../../shared/domain/IdObject';
import { v4 as uuidv4 } from 'uuid';
import { Game } from './Game';

export class GameId extends IdObject {
  static generate(): IdObject {
    let value;
    do {
      value = uuidv4();
    } while (Game.games.find((x) => x.gameId.toString() === value));
    return new GameId(value);
  }
}
