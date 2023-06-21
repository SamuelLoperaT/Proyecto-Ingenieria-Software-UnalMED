import { LocateTypeConstants } from './LocateTypeConstants';
import { TabDto } from '../../tab/domain/TabDto';

export interface LocateDto {
  tabs: Array<TabDto>;
  locateType: LocateTypeConstants;
  locateId: string;
}
