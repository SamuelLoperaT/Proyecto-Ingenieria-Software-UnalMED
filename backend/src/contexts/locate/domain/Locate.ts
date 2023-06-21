import { DomainRoot } from '../../shared/domain/DomainRoot';
import { ParamsOf } from '../../shared/domain/ParamsOf';
import { LocateDto } from './LocateDto';
import { LocateType } from './LocateType';
import { LocateId } from './LocateId';
import { Tab } from '../../tab/domain/Tab';

export abstract class Locate<T extends LocateDto>
  extends DomainRoot<T>
  implements ParamsOf<LocateDto>
{
  public locateId: LocateId;
  public locateType: LocateType;
  public tabs: Array<Tab>;

  protected constructor(
    locateId: LocateId,
    tabs: Array<Tab>,
    locateType: LocateType,
  ) {
    super();
    this.tabs = tabs;
    this.locateType = locateType;
    this.locateId = locateId;
  }
}
