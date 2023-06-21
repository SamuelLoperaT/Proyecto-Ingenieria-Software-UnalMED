import { ParamsOf } from '../../shared/domain/ParamsOf';
import { BoxDto } from './BoxDto';
import { Locate } from '../../locate/domain/Locate';
import { LocateTypeConstants } from '../../locate/domain/LocateTypeConstants';
import { Color } from '../../shared/domain/Color';
import { BoxType } from './BoxType';
import { BoxTypeConstants } from './BoxTypeConstants';
import { ColorConstants } from '../../shared/domain/ColorConstants';
import { LocateId } from '../../locate/domain/LocateId';
import { LocateType } from '../../locate/domain/LocateType';
import { Tab } from '../../tab/domain/Tab';

export class Box extends Locate<BoxDto> implements ParamsOf<BoxDto> {
  public color: Color;
  public boxType: BoxType;

  constructor(
    locateId: LocateId,
    tabs: Array<Tab>,
    color: Color,
    boxType: BoxType,
  ) {
    super(locateId, tabs, new LocateType(LocateTypeConstants.BOX));
    this.color = color;
    this.boxType = boxType;
  }

  static fromPrimitives(dto: BoxDto): Box {
    return new Box(
      new LocateId(dto.locateId),
      dto.tabs?.map((t) => Tab.fromPrimitives(t)) ?? [],
      new Color(dto.color),
      new BoxType(dto.boxType),
    );
  }

  toPrimitives(): BoxDto {
    return {
      tabs: this.tabs.map((t) => t.toPrimitives()),
      locateType: this.locateType.toString() as LocateTypeConstants,
      boxType: this.boxType.toString() as BoxTypeConstants,
      color: this.color.toString() as ColorConstants,
      locateId: this.locateId.toString(),
    };
  }
}
