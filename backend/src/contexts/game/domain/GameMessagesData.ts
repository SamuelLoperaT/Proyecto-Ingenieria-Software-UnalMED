import { GameMessagesConstants } from './GameMessagesConstants';
import { GameDto } from './GameDto';
import { MessagesData } from '../../shared/domain/MessagesData';

export type GameMessagesData<T extends GameMessagesConstants> = MessagesData<
  GameMessagesDataConfig,
  T
>;

export class GameMessagesDataConfig
  implements Required<Record<GameMessagesConstants, any>>
{
  GAME_CREATED: GameDto;
  USER_JOINED: GameDto;
}
