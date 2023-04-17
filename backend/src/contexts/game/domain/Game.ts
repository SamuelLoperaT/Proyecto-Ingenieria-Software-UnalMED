import { GameId } from './GameId';
import { DomainRoot } from '../../shared/domain/DomainRoot';
import { GameDto } from './GameDto';
import { ParamsOf } from '../../shared/domain/ParamsOf';
import { Player } from '../../players/domain/Player';

export class Game extends DomainRoot<GameDto> implements ParamsOf<GameDto> {
  public static games: Array<Game> = [];
  public readonly gameId: GameId;
  public readonly players: Array<Player>;

  private constructor(gameId: GameId, players: Array<Player>) {
    super();
    this.gameId = gameId;
    this.players = players;
    Game.games.push(this);
  }

  static fromPrimitives(primitives: GameDto): Game {
    return new Game(
      new GameId(primitives.gameId),
      Array.isArray(primitives.players)
        ? primitives.players.map((p) => Player.fromPrimitives(p))
        : [],
    );
  }

  toPrimitives(): GameDto {
    return {
      gameId: this.gameId.toString(),
      players: this.players.map((x) => x.toPrimitives()),
    };
  }
}
