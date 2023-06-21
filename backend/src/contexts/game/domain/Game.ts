import { GameId } from './GameId';
import { DomainRoot } from '../../shared/domain/DomainRoot';
import { GameDto } from './GameDto';
import { ParamsOf } from '../../shared/domain/ParamsOf';
import { Player } from '../../players/domain/Player';
import { Color } from '../../shared/domain/Color';
import { GameStatus } from './GameStatus';
import { GameStatusConstants } from './GameStatusConstants';
import { ColorConstants } from '../../shared/domain/ColorConstants';
import { Dice } from '../../dice/domain/Dice';
import { Board } from '../../board/Board';

export class Game extends DomainRoot<GameDto> implements ParamsOf<GameDto> {
  public static games: Map<string, Game> = new Map<string, Game>();
  public readonly gameId: GameId;
  public readonly players: Array<Player>;
  public readonly selectedColors: Array<Color>;
  public readonly dices: Array<Dice>;
  public readonly winners: Array<Player>;
  public readonly status: GameStatus;
  public readonly numberOfTabs: number;
  public readonly board: Board;

  constructor(
    gameId: GameId,
    players: Array<Player>,
    selectedColors: Array<Color>,
    dices: Array<Dice>,
    winners: Array<Player>,
    status: GameStatus,
    numberOfTabs: number,
    board: Board,
  ) {
    super();
    this.gameId = gameId;
    this.players = players;
    this.selectedColors = selectedColors;
    this.dices = dices;
    this.winners = winners;
    this.status = status;
    this.numberOfTabs = numberOfTabs;
    this.board = board;
    Game.games.set(gameId.toString(), this);
  }

  static fromPrimitives(primitives: GameDto): Game {
    return new Game(
      new GameId(primitives.gameId),
      Array.isArray(primitives.players)
        ? primitives.players.map((p) => Player.fromPrimitives(p))
        : [],
      Array.isArray(primitives.selectedColors)
        ? primitives.selectedColors.map((c) => new Color(c))
        : [],
      Array.isArray(primitives.dices)
        ? primitives.dices.map((d) => Dice.fromPrimitives(d))
        : [],
      Array.isArray(primitives.winners)
        ? primitives.winners.map((p) => Player.fromPrimitives(p))
        : [],
      new GameStatus(primitives.status),
      primitives.numberOfTabs,
      primitives.board ? Board.fromPrimitives(primitives.board) : null,
    );
  }

  toPrimitives(): GameDto {
    return {
      gameId: this.gameId.toString(),
      players: this.players.map((x) => x.toPrimitives()),
      dices: this.dices.map((x) => x.toPrimitives()),
      numberOfTabs: this.numberOfTabs,
      selectedColors: this.selectedColors.map(
        (c) => c.toString() as ColorConstants,
      ),
      status: this.status.toString() as GameStatusConstants,
      winners: this.winners.map((x) => x.toPrimitives()),
      board: this.board.toPrimitives(),
    };
  }
}
