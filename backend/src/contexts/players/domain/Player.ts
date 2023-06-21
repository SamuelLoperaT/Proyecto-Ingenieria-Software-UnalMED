import { DomainRoot } from '../../shared/domain/DomainRoot';
import { PlayerDto } from './PlayerDto';
import { ParamsOf } from '../../shared/domain/ParamsOf';
import { PlayerId } from './PlayerId';
import { ClientId } from './ClientId';
import { Color } from '../../shared/domain/Color';
import { PlayerStatus } from './PlayerStatus';
import { Tab } from '../../tab/domain/Tab';
import { ColorConstants } from '../../shared/domain/ColorConstants';
import { PlayerStatusConstants } from './PlayerStatusConstants';

export class Player
  extends DomainRoot<PlayerDto>
  implements ParamsOf<PlayerDto>
{
  public readonly catchCount: number;
  public readonly clientId: ClientId;
  public readonly color: Color;
  public readonly status: PlayerStatus;
  public readonly host: boolean;
  public readonly ladder: Array<any>; // TODO box
  public readonly penalties: number;
  public readonly tabs: Array<Tab>;
  public readonly lastTabsMoved: Array<Tab>;
  public readonly tabsAvailable: number;
  public readonly playerId: PlayerId;

  constructor(
    catchCount: number,
    clientId: ClientId,
    color: Color,
    status: PlayerStatus,
    host: boolean,
    ladder: Array<any>,
    penalties: number,
    tabs: Array<Tab>,
    lastTabsMoved: Array<Tab>,
    tabsAvailable: number,
    playerId: PlayerId,
  ) {
    super();
    this.catchCount = catchCount;
    this.clientId = clientId;
    this.color = color;
    this.status = status;
    this.host = host;
    this.ladder = ladder;
    this.penalties = penalties;
    this.tabs = tabs;
    this.lastTabsMoved = lastTabsMoved;
    this.tabsAvailable = tabsAvailable;
    this.playerId = playerId;
  }

  static fromPrimitives(primitives: PlayerDto): Player {
    return new Player(
      primitives.catchCount,
      new ClientId(primitives.clientId),
      new Color(primitives.color),
      new PlayerStatus(primitives.status),
      primitives.host,
      primitives.ladder,
      primitives.penalties,
      primitives.tabs.map((t) => Tab.fromPrimitives(t)),
      primitives.lastTabsMoved.map((t) => Tab.fromPrimitives(t)),
      primitives.tabsAvailable,
      new PlayerId(primitives.playerId),
    );
  }

  toPrimitives(): PlayerDto {
    return {
      catchCount: this.catchCount,
      clientId: this.clientId.toString(),
      color: this.color.toString() as ColorConstants,
      host: false,
      ladder: this.ladder.map((x) => x),
      penalties: this.penalties,
      status: this.status.toString() as PlayerStatusConstants,
      tabs: this.tabs.map((x) => x.toPrimitives()),
      lastTabsMoved: this.lastTabsMoved.map((x) => x.toPrimitives()),
      tabsAvailable: 0,
      playerId: this.playerId.toString(),
    };
  }
}
