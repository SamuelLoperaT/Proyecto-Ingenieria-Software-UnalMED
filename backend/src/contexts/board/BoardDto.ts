import { SkyDto } from '../sky/domain/SkyDto';
import { BoxDto } from '../box/domain/BoxDto';
import { JailDto } from '../jail/domain/JailDto';

export interface BoardDto {
  gameId: string;
  sky: SkyDto;
  boxes: Array<BoxDto>;
  jails: Array<JailDto>;
  leaders: Array<Array<BoxDto>>;
}
