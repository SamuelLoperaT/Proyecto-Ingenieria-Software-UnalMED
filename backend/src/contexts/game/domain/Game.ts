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
import { Board } from '../../board/domain/Board';
import { GameType } from './GameType';
import { GameTypesConstants } from './GameTypesConstants';

export class Game extends DomainRoot<GameDto> implements ParamsOf<GameDto> {
  public static games: Map<string, Game> = new Map<string, Game>();
  public readonly gameId: GameId;
  public readonly players: Array<Player>;
  public readonly availableColors: Array<Color>;
  public readonly dices: Array<Dice>;
  public readonly winners: Array<Player>;
  public readonly status: GameStatus;
  public readonly numberOfTabs: number;
  public readonly numberOfDices: number;
  public readonly type: GameType;
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
    type: GameType,
    numberOfDices: number,
  ) {
    super();
    this.gameId = gameId;
    this.players = players;
    this.availableColors = selectedColors;
    this.dices = dices;
    this.winners = winners;
    this.status = status;
    this.numberOfTabs = numberOfTabs;
    this.board = board;
    this.numberOfDices = numberOfDices;
    this.type = type;
    Game.games.set(gameId.toString(), this);
  }

  static fromPrimitives(primitives: GameDto): Game {
    return new Game(
      new GameId(primitives.gameId),
      Array.isArray(primitives.players)
        ? primitives.players.map((p) => Player.fromPrimitives(p))
        : [],
      Array.isArray(primitives.availableColors)
        ? primitives.availableColors.map((c) => new Color(c))
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
      new GameStatus(primitives.type),
      primitives.numberOfDices,
    );
  }

  toPrimitives(): GameDto {
    return {
      gameId: this.gameId.toString(),
      players: this.players.map((x) => x.toPrimitives()),
      dices: this.dices.map((x) => x.toPrimitives()),
      numberOfTabs: this.numberOfTabs,
      availableColors: this.availableColors.map(
        (c) => c.toString() as ColorConstants,
      ),
      status: this.status.toString() as GameStatusConstants,
      winners: this.winners.map((x) => x.toPrimitives()),
      board: this.board?.toPrimitives(),
      numberOfDices: this.numberOfDices,
      type: this.type.toString() as GameTypesConstants,
    };
  }
}
