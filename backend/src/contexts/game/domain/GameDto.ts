import { PlayerDto } from '../../players/domain/PlayerDto';
import { ColorConstants } from '../../shared/domain/ColorConstants';
import { GameStatusConstants } from './GameStatusConstants';
import { DiceDto } from '../../dice/domain/DiceDto';
import { BoardDto } from '../../board/domain/BoardDto';
import { GameTypesConstants } from './GameTypesConstants';

export interface GameDto {
  gameId: string;
  players: Array<PlayerDto>;
  availableColors: Array<ColorConstants>;
  dices: Array<DiceDto>;
  winners: Array<PlayerDto>;
  status: GameStatusConstants;
  numberOfTabs: number;
  numberOfDices: number;
  type: GameTypesConstants;
  board: BoardDto;
}
