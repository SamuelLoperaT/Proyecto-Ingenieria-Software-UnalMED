import { IdObject } from '../../shared/domain/IdObject';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../../board/domain/Board';

export class LocateId extends IdObject {
  static generate(board?: Board): LocateId {
    let value;
    do {
      value = uuidv4();
    } while (board && board.allLocations.has(value));
    return new LocateId(value);
  }
}
