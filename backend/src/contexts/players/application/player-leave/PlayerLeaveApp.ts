import { Logger } from '@nestjs/common';
import { ClientId } from '../../domain/ClientId';
import { Game } from '../../../game/domain/Game';
import { GameStatusConstants } from '../../../game/domain/GameStatusConstants';
import { IWsRepository } from '../../../shared/domain/IWsRepository';
import { GameMessagesDataConfig } from '../../../game/domain/GameMessagesData';
import { GameMessagesConstants } from '../../../game/domain/GameMessagesConstants';
import { Player } from '../../domain/Player';

export class PlayerLeaveApp {
  private logger: Logger = new Logger(PlayerLeaveApp.name);

  constructor(
    private readonly socketManager: IWsRepository<GameMessagesDataConfig>,
  ) {}

  async execute(clientId: ClientId): Promise<void> {
    this.logger.log(`[${this.execute.name}] INIT`);
    let player: Player;
    const game = new Array(...Game.games.values()).find((g) => {
      player = g.players.find(
        (p) => p.clientId.toString() === clientId.toString(),
      );
      return !!player;
    });
    if (!game) {
      return;
    }
    player.online = false;
    let callback: () => void;
    switch (game.status.toString() as GameStatusConstants) {
      case GameStatusConstants.PENDING:
        callback = async () => {
          if (!player.online) {
            game.availableColors.push(player.color);
            game.players.splice(
              game.players.findIndex(
                (p) => p.playerId.toString() == player.playerId.toString(),
              ),
            );
            await this.socketManager.emitToRoom(
              game.gameId.toString(),
              GameMessagesConstants.USER_LEAVE,
              game.toPrimitives(),
            );
          }
        };
        break;
      case GameStatusConstants.IN_PROGRESS:
        //TODO
        break;
      case GameStatusConstants.FINISHED:
        //TODO
        break;
    }
    if (callback) {
      setTimeout(callback, 5000);
    }
    this.logger.log(`[${this.execute.name}]
                    FINISH`);
  }
}
