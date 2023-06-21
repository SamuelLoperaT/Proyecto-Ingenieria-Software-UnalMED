import { DomainRoot } from '../../shared/domain/DomainRoot';
import { ParamsOf } from '../../shared/domain/ParamsOf';
import { TabDto } from './TabDto';
import { PlayerId } from '../../players/domain/PlayerId';
import { Color } from '../../shared/domain/Color';
import { LocateId } from '../../locate/domain/LocateId';
import { ColorConstants } from '../../shared/domain/ColorConstants';

export class Tab extends DomainRoot<TabDto> implements ParamsOf<TabDto> {
  public readonly available: boolean;
  public readonly beforeLocation: LocateId;
  public readonly color: Color;
  public readonly location: LocateId;
  public readonly moved: boolean;
  public readonly playerId: PlayerId;

  constructor(
    available: boolean,
    beforeLocation: LocateId,
    color: Color,
    location: LocateId,
    moved: boolean,
    playerId: PlayerId,
  ) {
    super();
    this.available = available;
    this.beforeLocation = beforeLocation;
    this.color = color;
    this.location = location;
    this.moved = moved;
    this.playerId = playerId;
  }

  static fromPrimitives(primitives: TabDto): Tab {
    return new Tab(
      primitives.available,
      primitives.beforeLocation
        ? new LocateId(primitives.beforeLocation)
        : null,
      new Color(primitives.color),
      new LocateId(primitives.location),
      primitives.moved,
      new PlayerId(primitives.playerId),
    );
  }

  // private static resolveLocationType<T extends LocateDto>(
  //   location: T,
  // ): Locate<T> {
  //   switch (location.locateType) {
  //     case LocateTypeConstants.SKY:
  //       return Sky.fromPrimitives(location) as Locate<T>;
  //     case LocateTypeConstants.BOX:
  //       return Box.fromPrimitives(
  //         location as unknown as BoxDto,
  //       ) as unknown as Locate<T>;
  //     case LocateTypeConstants.JAIL:
  //       return Jail.fromPrimitives(
  //         location as unknown as JailDto,
  //       ) as unknown as Locate<T>;
  //   }
  //   return null;
  // }

  toPrimitives(): TabDto {
    return {
      available: this.available,
      beforeLocation: this.beforeLocation?.toString(),
      color: this.color.toString() as ColorConstants,
      location: this.location.toString(),
      moved: this.moved,
      playerId: this.playerId.toString(),
    };
  }
}
