import { PlayerDto } from '../../players/domain/PlayerDto';

export interface GameDto {
  gameId: string;
  players: Array<PlayerDto>;
}
