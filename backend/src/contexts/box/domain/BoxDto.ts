import { LocateDto } from '../../locate/domain/LocateDto';
import { ColorConstants } from '../../shared/domain/ColorConstants';
import { BoxTypeConstants } from './BoxTypeConstants';

export interface BoxDto extends LocateDto {
  color: ColorConstants;
  boxType: BoxTypeConstants;
}
