import { DomainRoot } from '../shared/domain/DomainRoot';
import { ParamsOf } from '../shared/domain/ParamsOf';
import { BoardDto } from './BoardDto';
import { Box } from '../box/domain/Box';
import { GameId } from '../game/domain/GameId';
import { Jail } from '../jail/domain/Jail';
import { Sky } from '../sky/domain/Sky';
import { Locate } from '../locate/domain/Locate';

export class Board extends DomainRoot<BoardDto> implements ParamsOf<BoardDto> {
  public boxes: Array<Box>;
  public gameId: GameId;
  public jails: Array<Jail>;
  public leaders: Array<Array<Box>>;
  public sky: Sky;
  public allLocations: Map<string, Locate<any>> = new Map<
    string,
    Locate<any>
  >();

  constructor(
    boxes: Array<Box>,
    gameId: GameId,
    jails: Array<Jail>,
    leaders: Array<Array<Box>>,
    sky: Sky,
  ) {
    super();
    this.boxes = boxes;
    this.gameId = gameId;
    this.jails = jails;
    this.leaders = leaders;
    this.sky = sky;
    for (const locate of [...boxes, ...jails, sky, ...leaders.flat(1)]) {
      this.allLocations.set(locate.locateId.toString(), locate);
    }
  }

  toPrimitives(): BoardDto {
    return {
      boxes: this.boxes.map((b) => b.toPrimitives()),
      gameId: this.gameId.toString(),
      jails: this.jails.map((j) => j.toPrimitives()),
      leaders: this.leaders.map((l) => l.map((b) => b.toPrimitives())),
      sky: this.sky.toPrimitives(),
    };
  }

  static fromPrimitives(primitives: BoardDto) {
    return new Board(
      primitives.boxes.map(Box.fromPrimitives),
      new GameId(primitives.gameId),
      primitives.jails.map(Jail.fromPrimitives),
      primitives.leaders.map((j) => j.map(Box.fromPrimitives)),
      Sky.fromPrimitives(primitives.sky),
    );
  }
}
