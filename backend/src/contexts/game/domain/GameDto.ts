import { PlayerDto } from '../../players/domain/PlayerDto';
import { ColorConstants } from '../../shared/domain/ColorConstants';
import { GameStatusConstants } from './GameStatusConstants';
import { DiceDto } from '../../dice/domain/DiceDto';
import { BoardDto } from '../../board/BoardDto';

export interface GameDto {
  gameId: string;
  players: Array<PlayerDto>;
  selectedColors: Array<ColorConstants>;
  dices: Array<DiceDto>;
  winners: Array<PlayerDto>;
  status: GameStatusConstants;
  numberOfTabs: number;
  board: BoardDto;
}
