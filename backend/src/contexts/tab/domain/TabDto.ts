import { ColorConstants } from '../../shared/domain/ColorConstants';

export interface TabDto {
  location: string;
  beforeLocation: string;
  color: ColorConstants;
  available: boolean;
  playerId: string;
  moved: boolean;
}
