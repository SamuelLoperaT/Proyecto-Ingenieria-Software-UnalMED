import { DomainRoot } from '../../shared/domain/DomainRoot';
import { PlayerDto } from './PlayerDto';
import { ParamsOf } from '../../shared/domain/ParamsOf';
import { PlayerId } from './PlayerId';

export class Player
  extends DomainRoot<PlayerDto>
  implements ParamsOf<PlayerDto>
{
  public readonly playerId: PlayerId;

  private constructor(playerId: PlayerId) {
    super();
    this.playerId = playerId;
  }

  static fromPrimitives(primitives: PlayerDto): Player {
    return new Player(new PlayerId(primitives.playerId));
  }

  toPrimitives(): PlayerDto {
    return { playerId: this.playerId.toString() };
  }
}
