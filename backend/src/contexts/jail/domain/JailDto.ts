import { LocateDto } from '../../locate/domain/LocateDto';
import { ColorConstants } from '../../shared/domain/ColorConstants';

export interface JailDto extends LocateDto {
  color: ColorConstants;
}
