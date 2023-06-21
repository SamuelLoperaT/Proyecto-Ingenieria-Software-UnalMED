import { ColorConstants } from '../../shared/domain/ColorConstants';
import { TabDto } from '../../tab/domain/TabDto';
import { PlayerStatusConstants } from './PlayerStatusConstants';

export interface PlayerDto {
  lastTabsMoved: Array<TabDto>;
  playerId: string;
  clientId: string;
  status: PlayerStatusConstants;
  color: ColorConstants;
  host: boolean;
  tabs: Array<TabDto>; //TabsDto;
  tabsAvailable: number;
  catchCount: number;
  penalties: number;
  ladder: Array<any>; //JailDto
}
