import { ParamsOf } from '../../shared/domain/ParamsOf';
import { JailDto } from './JailDto';
import { Locate } from '../../locate/domain/Locate';
import { LocateTypeConstants } from '../../locate/domain/LocateTypeConstants';
import { LocateType } from '../../locate/domain/LocateType';
import { Color } from '../../shared/domain/Color';
import { ColorConstants } from '../../shared/domain/ColorConstants';
import { LocateId } from '../../locate/domain/LocateId';
import { Tab } from '../../tab/domain/Tab';

export class Jail extends Locate<JailDto> implements ParamsOf<JailDto> {
  public color: Color;

  constructor(locateId: LocateId, tabs: Array<Tab>, color: Color) {
    super(locateId, tabs, new LocateType(LocateTypeConstants.BOX));
    this.color = color;
  }

  static fromPrimitives(dto: JailDto): Jail {
    return new Jail(
      new LocateId(dto.locateId),
      dto.tabs?.map((t) => Tab.fromPrimitives(t)) ?? [],
      new Color(dto.color),
    );
  }

  toPrimitives(): JailDto {
    return {
      tabs: this.tabs.map((t) => t.toPrimitives()),
      locateType: this.locateType.toString() as LocateTypeConstants,
      color: this.color.toString() as ColorConstants,
      locateId: this.locateId.toString(),
    };
  }
}
