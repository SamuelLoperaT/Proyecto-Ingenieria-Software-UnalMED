import { ParamsOf } from '../../shared/domain/ParamsOf';
import { SkyDto } from './SkyDto';
import { Locate } from '../../locate/domain/Locate';
import { LocateTypeConstants } from '../../locate/domain/LocateTypeConstants';
import { LocateType } from '../../locate/domain/LocateType';
import { LocateId } from '../../locate/domain/LocateId';
import { Tab } from '../../tab/domain/Tab';

export class Sky extends Locate<SkyDto> implements ParamsOf<SkyDto> {
  constructor(locateId: LocateId, tabs: Array<Tab>) {
    super(locateId, tabs, new LocateType(LocateTypeConstants.SKY));
  }

  static fromPrimitives(primitives: SkyDto): Sky {
    return new Sky(
      new LocateId(primitives.locateId),
      primitives.tabs?.map((t) => Tab.fromPrimitives(t)) ?? [],
    );
  }

  toPrimitives(): SkyDto {
    return {
      locateId: this.locateId.toString(),
      tabs: this.tabs.map((t) => t.toPrimitives()),
      locateType: this.locateType.toString() as LocateTypeConstants,
    };
  }
}
